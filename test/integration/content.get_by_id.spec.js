'use strict';

/* dependencies */
const path = require('path');
const _ = require('lodash');
const { expect } = require('chai');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Content } = require(path.join(__dirname, '..', '..'));

describe('Content', function () {

  let jurisdiction;

  before(function (done) {
    Jurisdiction.remove(done);
  });

  before(function (done) {
    jurisdiction = Jurisdiction.fake();
    jurisdiction.post(function (error, created) {
      jurisdiction = created;
      done(error, created);
    });
  });

  before(function (done) {
    Content.remove(done);
  });

  describe('get by id', function () {

    let content;

    before(function (done) {
      content = Content.fake();
      content.jurisdiction = jurisdiction;
      content
        .post(function (error, created) {
          content = created;
          done(error, created);
        });
    });

    it('should be able to get an instance', function (done) {
      Content
        .getById(content._id, function (error, found) {
          expect(error).to.not.exist;
          expect(found).to.exist;
          expect(found._id).to.eql(content._id);
          done(error, found);
        });
    });

    it('should be able to get with options', function (done) {

      const options = {
        _id: content._id,
        select: 'title'
      };

      Content
        .getById(options, function (error, found) {
          expect(error).to.not.exist;
          expect(found).to.exist;
          expect(found._id).to.eql(content._id);
          expect(found.title).to.exist;

          //...assert selection
          const fields = _.keys(found.toObject());
          expect(fields).to.have.length(3);
          _.map([
            'type',
            'body',
            'publishedAt'
          ], function (field) {
            expect(fields).to.not.include(field);
          });


          done(error, found);
        });

    });

    it('should throw if not exists', function (done) {
      const content = Content.fake();

      Content
        .getById(content._id, function (error, found) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(found).to.not.exist;
          done();
        });
    });

  });

  after(function (done) {
    Content.remove(done);
  });

  after(function (done) {
    Jurisdiction.remove(done);
  });

});