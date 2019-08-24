import {
  clear as clearHttp,
  testRouter,
} from '@lykmapipo/express-test-helpers';
import {
  clear as clearDb,
  create,
  expect,
} from '@lykmapipo/mongoose-test-helpers';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { Content, contentRouter } from '../../src';

describe('Content Rest API', () => {
  const jurisdiction = Jurisdiction.fake();
  const content = Content.fake();
  content.set({ jurisdiction });

  const options = {
    pathSingle: '/contents/:id',
    pathList: '/contents',
    pathSchema: '/contents/schema/',
    pathExport: '/contents/export/',
  };

  before(done => clearDb(Content, Jurisdiction, done));

  before(() => clearHttp());

  before(done => create(jurisdiction, done));

  it('should handle HTTP POST on /contents', done => {
    const { testPost } = testRouter(options, contentRouter);
    testPost({ ...content.toObject() })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const created = new Content(body);
        expect(created._id).to.exist.and.be.eql(content._id);
        expect(created.type).to.exist.and.be.eql(content.type);
        done(error, body);
      });
  });

  it('should handle HTTP GET on /contents', done => {
    const { testGet } = testRouter(options, contentRouter);
    testGet()
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.data).to.exist;
        expect(body.total).to.exist;
        expect(body.limit).to.exist;
        expect(body.skip).to.exist;
        expect(body.page).to.exist;
        expect(body.pages).to.exist;
        expect(body.lastModified).to.exist;
        done(error, body);
      });
  });

  it('should handle GET /contents/schema', done => {
    const { testGetSchema } = testRouter(options, contentRouter);
    testGetSchema().expect(200, done);
  });

  it('should handle GET /contents/export', done => {
    const { testGetExport } = testRouter(options, contentRouter);
    testGetExport()
      .expect('Content-Type', 'text/csv; charset=utf-8')
      .expect(({ headers }) => {
        expect(headers['content-disposition']).to.exist;
      })
      .expect(200, done);
  });

  it('should handle HTTP GET on /contents/:id', done => {
    const { testGet } = testRouter(options, contentRouter);
    const params = { id: content._id.toString() };
    testGet(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const found = new Content(body);
        expect(found._id).to.exist.and.be.eql(content._id);
        expect(found.type).to.exist.and.be.eql(content.type);
        done(error, body);
      });
  });

  it('should handle HTTP PATCH on /contents/:id', done => {
    const { testPatch } = testRouter(options, contentRouter);
    const { description } = content.fakeOnly('description');
    const params = { id: content._id.toString() };
    testPatch(params, { description })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Content(body);
        expect(patched._id).to.exist.and.be.eql(content._id);
        expect(patched.type).to.exist.and.be.eql(content.type);
        done(error, body);
      });
  });

  it('should handle HTTP PUT on /contents/:id', done => {
    const { testPut } = testRouter(options, contentRouter);
    const { description } = content.fakeOnly('description');
    const params = { id: content._id.toString() };
    testPut(params, { description })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Content(body);
        expect(patched._id).to.exist.and.be.eql(content._id);
        expect(patched.type).to.exist.and.be.eql(content.type);
        done(error, body);
      });
  });

  it('should handle HTTP DELETE on /contents/:id', done => {
    const { testDelete } = testRouter(options, contentRouter);
    const params = { id: content._id.toString() };
    testDelete(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Content(body);
        expect(patched._id).to.exist.and.be.eql(content._id);
        expect(patched.type).to.exist.and.be.eql(content.type);
        done(error, body);
      });
  });

  after(() => clearHttp());

  after(done => clearDb(Content, Jurisdiction, done));
});
