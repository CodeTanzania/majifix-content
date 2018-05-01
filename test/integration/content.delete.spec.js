'use strict';

/*** dependencies */
const path = require('path');
const chai = require('chai');
const mongoose = require('mongoose');
const expect = chai.expect;
const { Content } = require(path.join(__dirname, '..', '..'));

describe('Content', function () {

  before(function (done) {
    mongoose.connect('mongodb://localhost/majifix-content', done);
  });

  before(function (done) {
    Content.remove(done);
  });

  describe('static delete', function () {

    let content;

    before(function (done) {
      const fake = Content.fake();
      fake
        .post(function (error, created) {
          content = created;
          done(error, created);
        });
    });

    it('should be able to delete', function (done) {
      Content
        .del(content._id, function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(content._id);
          done(error, deleted);
        });
    });

    it('should throw if not exists', function (done) {
      Content
        .del(content._id, function (error, deleted) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(deleted).to.not.exist;
          done();
        });
    });

  });

  describe('instance delete', function () {

    let content;

    before(function (done) {
      const fake = Content.fake();
      fake
        .post(function (error, created) {
          content = created;
          done(error, created);
        });
    });

    it('should be able to delete', function (done) {
      content
        .del(function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(content._id);
          done(error, deleted);
        });
    });

    it('should throw if not exists', function (done) {
      content
        .del(function (error, deleted) {
          expect(error).to.not.exist;
          expect(deleted).to.exist;
          expect(deleted._id).to.eql(content._id);
          done();
        });
    });

  });

  after(function (done) {
    Content.remove(done);
  });

});