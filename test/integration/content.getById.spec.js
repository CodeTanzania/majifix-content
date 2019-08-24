import _ from 'lodash';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Content } from '../../src';

describe('Content', () => {
  const jurisdiction = Jurisdiction.fake();

  before(done => clear(Content, Jurisdiction, done));
  before(done => create(jurisdiction, done));

  describe('get by id', () => {
    let content;

    before(done => {
      content = Content.fake();
      content.jurisdiction = jurisdiction;
      content.post((error, created) => {
        content = created;
        done(error, created);
      });
    });

    it('should be able to get an instance', done => {
      Content.getById(content._id, (error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found._id).to.eql(content._id);
        done(error, found);
      });
    });

    it('should be able to get with options', done => {
      const options = {
        _id: content._id,
        select: 'title',
      };

      Content.getById(options, (error, found) => {
        expect(error).to.not.exist;
        expect(found).to.exist;
        expect(found._id).to.eql(content._id);
        expect(found.title).to.exist;

        // ...assert selection
        const fields = _.keys(found.toObject());
        expect(fields).to.have.length(3);
        _.map(['type', 'body', 'publishedAt'], field => {
          expect(fields).to.not.include(field);
        });

        done(error, found);
      });
    });

    it('should throw if not exists', done => {
      content = Content.fake();

      Content.getById(content._id, (error, found) => {
        expect(error).to.exist;
        expect(error.status).to.exist;
        expect(error.message).to.be.equal('Not Found');
        expect(found).to.not.exist;
        done();
      });
    });
  });

  after(done => clear(Content, Jurisdiction, done));
});
