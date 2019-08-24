import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Content } from '../../src';

describe('Content', () => {
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(Content, Jurisdiction, done));
  before(done => create(jurisdiction, done));

  describe('static put', () => {
    let content;

    before(done => {
      content = Content.fake();
      content.jurisdiction = jurisdiction;
      content.post((error, created) => {
        content = created;
        done(error, created);
      });
    });

    it('should be able to put', done => {
      content = content.fakeOnly('title.en');

      Content.put(content._id, content, (error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(content._id);
        expect(updated.title.en).to.eql(content.title.en);
        done(error, updated);
      });
    });

    it('should throw if not exists', done => {
      const fake = Content.fake();

      Content.put(fake._id, fake, (error, updated) => {
        expect(error).to.exist;
        expect(error.status).to.exist;
        expect(error.message).to.be.equal('Not Found');
        expect(updated).to.not.exist;
        done();
      });
    });
  });

  describe('instance put', () => {
    let content;

    before(done => {
      const fake = Content.fake();
      fake.post((error, created) => {
        content = created;
        done(error, created);
      });
    });

    it('should be able to put', done => {
      content = content.fakeOnly('title.en');

      content.put((error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(content._id);
        expect(updated.title.en).to.eql(content.title.en);
        done(error, updated);
      });
    });

    it('should throw if not exists', done => {
      content.put((error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(content._id);
        done();
      });
    });
  });

  after(done => clear(Content, Jurisdiction, done));
});
