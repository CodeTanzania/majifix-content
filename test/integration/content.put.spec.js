'use strict';

/* dependencies */
const path = require('path');
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

  describe('static put', function () {

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

    it('should be able to put', function (done) {

      content = content.fakeOnly('title.en');

      Content
        .put(content._id, content, function (error, updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(content._id);
          expect(updated.title.en).to.eql(content.title.en);
          done(error, updated);
        });
    });

    it('should throw if not exists', function (done) {

      const fake = Content.fake();

      Content
        .put(fake._id, fake, function (error, updated) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(updated).to.not.exist;
          done();
        });
    });

  });

  describe('instance put', function () {

    let content;

    before(function (done) {
      const fake = Content.fake();
      fake
        .post(function (error, created) {
          content = created;
          done(error, created);
        });
    });

    it('should be able to put', function (done) {
      content = content.fakeOnly('title.en');

      content
        .put(function (error, updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(content._id);
          expect(updated.title.en).to.eql(content.title.en);
          done(error, updated);
        });
    });

    it('should throw if not exists', function (done) {
      content
        .put(function (error, updated) {
          expect(error).to.not.exist;
          expect(updated).to.exist;
          expect(updated._id).to.eql(content._id);
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
