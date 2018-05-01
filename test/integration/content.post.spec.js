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

  describe('static post', function () {

    let content;

    it('should be able to post', function (done) {

      content = Content.fake();

      Content
        .post(content, function (error, created) {
          expect(error).to.not.exist;
          expect(created).to.exist;
          expect(created._id).to.eql(content._id);
          expect(created.group).to.eql(content.group);
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
          expect(created.group).to.eql(content.group);
          expect(created.title.en).to.eql(content.title.en);
          done(error, created);
        });
    });

  });

  after(function (done) {
    Content.remove(done);
  });

});