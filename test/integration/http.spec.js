'use strict';

/*** dependencies */
const path = require('path');
const request = require('supertest');
const chai = require('chai');
const mongoose = require('mongoose');
const expect = chai.expect;
const { Content, app } = require(path.join(__dirname, '..', '..'));


describe('Content', function () {

  describe('Rest API', function () {

    before(function (done) {
      mongoose.connect('mongodb://localhost/majifix-content', done);
    });

    before(function (done) {
      Content.remove(done);
    });

    let content;

    it('should handle HTTP POST on /contents', function (done) {

      content = Content.fake();

      request(app)
        .post('/v1.0.0/contents')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(content)
        .expect(201)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const created = response.body;

          expect(created._id).to.exist;
          expect(created.type.en).to.exist;
          expect(created.title.en).to.exist;
          expect(created.body.en).to.exist;

          done(error, response);

        });

    });

    it('should handle HTTP GET on /contents', function (done) {

      request(app)
        .get('/v1.0.0/contents')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          //assert headers
          expect(response.headers['last-modified'])
            .to.exist;

          //assert payload
          const result = response.body;
          expect(result.data).to.exist;
          expect(result.total).to.exist;
          expect(result.limit).to.exist;
          expect(result.skip).to.exist;
          expect(result.page).to.exist;
          expect(result.pages).to.exist;
          expect(result.lastModified).to.exist;
          done(error, response);

        });

    });

    it('should handle HTTP GET on /contents/id:', function (done) {

      request(app)
        .get(`/v1.0.0/contents/${content._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const found = response.body;
          expect(found._id).to.exist;
          expect(found._id).to.be.equal(content._id.toString());
          expect(found.type.en).to.be.equal(content.type.en);
          expect(found.title.en).to.be.equal(content.title.en);
          expect(found.body.en).to.be.equal(content.body.en);

          done(error, response);

        });

    });

    it('should handle HTTP PATCH on /contents/id:', function (done) {

      const patch = content.fakeOnly('name');

      request(app)
        .patch(`/v1.0.0/contents/${content._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(patch)
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const patched = response.body;

          expect(patched._id).to.exist;
          expect(patched._id).to.be.equal(content._id.toString());
          expect(patched.type.en).to.be.equal(content.type.en);
          expect(patched.title.en).to.be.equal(content.title.en);
          expect(patched.body.en).to.be.equal(content.body.en);

          done(error, response);

        });

    });

    it('should handle HTTP PUT on /contents/id:', function (done) {

      const put = content.fakeOnly('name');

      request(app)
        .put(`/v1.0.0/contents/${content._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(put)
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const puted = response.body;

          expect(puted._id).to.exist;
          expect(puted._id).to.be.equal(content._id.toString());
          expect(puted.type.en).to.be.equal(content.type.en);
          expect(puted.title.en).to.be.equal(content.title.en);
          expect(puted.body.en).to.be.equal(content.body.en);

          done(error, response);

        });

    });

    it('should handle HTTP DELETE on /contents/:id', function (done) {

      request(app)
        .delete(`/v1.0.0/contents/${content._id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end(function (error, response) {
          expect(error).to.not.exist;
          expect(response).to.exist;

          const deleted = response.body;

          expect(deleted._id).to.exist;
          expect(deleted._id).to.be.equal(content._id.toString());
          expect(deleted.type.en).to.be.equal(content.type.en);
          expect(deleted.title.en).to.be.equal(content.title.en);
          expect(deleted.body.en).to.be.equal(content.body.en);

          done(error, response);

        });

    });


    after(function (done) {
      Content.remove(done);
    });

  });

});