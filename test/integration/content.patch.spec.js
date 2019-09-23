import _ from 'lodash';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Content } from '../../src';

describe('Content static patch', () => {
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

  it('should be able to patch', done => {
    content = content.fakeOnly('title.en');

    Content.patch(content._id, content, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(content._id);
      expect(updated.title.en).to.eql(content.title.en);
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    const fake = Content.fake().toObject();

    Content.patch(fake._id, _.omit(fake, '_id'), (error, updated) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(updated).to.not.exist;
      done();
    });
  });

  after(done => clear(Content, Jurisdiction, done));
});

describe('Content instance patch', () => {
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

  it('should be able to patch', done => {
    content = content.fakeOnly('title.en');

    content.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(content._id);
      expect(updated.title.en).to.eql(content.title.en);
      done(error, updated);
    });
  });

  it('should throw if not exists', done => {
    content.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(content._id);
      done();
    });
  });

  after(done => clear(Content, Jurisdiction, done));
});
