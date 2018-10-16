'use strict';

/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Content } = require(path.join(__dirname, '..', '..'));

describe('Content', function () {

  let jurisdiction;

  before(function (done) {
    Jurisdiction.deleteMany(done);
  });

  before(function (done) {
    jurisdiction = Jurisdiction.fake();
    jurisdiction.post(function (error, created) {
      jurisdiction = created;
      done(error, created);
    });
  });

  describe('static post', function () {

    let content;

    it('should be able to post', function (done) {

      content = Content.fake();
      content.jurisdiction = jurisdiction;

      Content
        .post(content, function (error, created) {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(content._id);
          expect(created.type.en).to.eql(content.type.en);
          expect(created.title.en).to.eql(content.title.en);
          done(error, created);
        });
    });

  });

  describe('instance post', function () {

    let content;

    it('should be able to post', function (done) {

      content = Content.fake();

      content
        .post(function (error, created) {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(content._id);
          expect(created.type.en).to.eql(content.type.en);
          expect(created.title.en).to.eql(content.title.en);
          done(error, created);
        });
    });

  });

  after(function (done) {
    Content.deleteMany(done);
  });

  after(function (done) {
    Jurisdiction.deleteMany(done);
  });

});
