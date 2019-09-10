import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Content } from '../../src';

describe('Content static delete', () => {
  before(done => clear(Content, Jurisdiction, done));

  const jurisdiction = Jurisdiction.fake();

  before(done => create(jurisdiction, done));

  let content;

  before(done => {
    content = Content.fake();
    content.jurisdiction = jurisdiction;
    content.post((error, created) => {
      content = created;
      done(error, created);
    });
  });

  it('should be able to delete', done => {
    Content.del(content._id, (error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(content._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', done => {
    Content.del(content._id, (error, deleted) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(deleted).to.not.exist;
      done();
    });
  });

  after(done => clear(Content, Jurisdiction, done));
});

describe('Content instance delete', () => {
  before(done => clear(Content, Jurisdiction, done));

  const jurisdiction = Jurisdiction.fake();

  before(done => create(jurisdiction, done));

  let content;

  before(done => {
    const fake = Content.fake();
    fake.post((error, created) => {
      content = created;
      done(error, created);
    });
  });

  it('should be able to delete', done => {
    content.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(content._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', done => {
    content.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(content._id);
      done();
    });
  });

  after(done => clear(Content, Jurisdiction, done));
});
