import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Content } from '../../src';

describe('Content', () => {
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(Content, Jurisdiction, done));
  before(done => create(jurisdiction, done));

  describe('static post', () => {
    let content;

    it('should be able to post', done => {
      content = Content.fake();
      content.jurisdiction = jurisdiction;

      Content.post(content, (error, created) => {
        expect(error).to.not.exist;
        expect(created).to.exist;
        expect(created._id).to.eql(content._id);
        expect(created.type.en).to.eql(content.type.en);
        expect(created.title.en).to.eql(content.title.en);
        done(error, created);
      });
    });
  });

  describe('instance post', () => {
    let content;

    it('should be able to post', done => {
      content = Content.fake();

      content.post((error, created) => {
        expect(error).to.not.exist;
        expect(created).to.exist;
        expect(created._id).to.eql(content._id);
        expect(created.type.en).to.eql(content.type.en);
        expect(created.title.en).to.eql(content.title.en);
        done(error, created);
      });
    });
  });

  after(done => clear(Content, Jurisdiction, done));
});
