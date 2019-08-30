import { expect } from '@lykmapipo/mongoose-test-helpers';
import Content from '../../src/content.model';

describe('Content', () => {
  describe('Schema', () => {
    it('should have jurisdiction field', () => {
      const { jurisdiction } = Content.schema.tree;
      const { instance } = Content.schema.paths.jurisdiction;

      expect(instance).to.be.equal('ObjectID');
      expect(jurisdiction).to.exist;
      expect(jurisdiction).to.be.an('object');
      expect(jurisdiction.type).to.be.a('function');
      expect(jurisdiction.type.name).to.be.equal('ObjectId');
      expect(jurisdiction.index).to.be.true;
      expect(jurisdiction.exists).to.be.exist.and.be.an('object');
      expect(jurisdiction.autopopulate).to.exist.and.be.an('object');
    });

    it('should have type field', () => {
      const { type } = Content.schema.tree;
      const { instance } = Content.schema.paths.type;

      expect(instance).to.be.equal('String');
      expect(type).to.exist;
      expect(type).to.be.an('object');
      expect(type.type).to.be.a('function');
      expect(type.type.name).to.be.equal('String');
      expect(type.required).to.be.true;
      expect(type.trim).to.be.true;
      expect(type.index).to.be.true;
      expect(type.searchable).to.be.true;
      expect(type.fake).to.be.true;
      expect(type.enum).to.exist;
    });

    describe('title', () => {
      it('should be an embedded subdocument', () => {
        const { title } = Content.schema.tree;
        const { instance } = Content.schema.paths.title;
        const { tree } = Content.schema.tree.title;

        expect(instance).to.be.equal('Embedded');
        expect(title).to.exist;
        expect(title).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.en).to.exist;
      });

      it('should have title `en` locale field', () => {
        const { instance } = Content.schema.paths.title.schema.paths.en;
        const { en } = Content.schema.tree.title.tree;

        expect(instance).to.be.equal('String');
        expect(en).to.exist;
        expect(en).to.be.an('object');
        expect(en.type).to.be.a('function');
        expect(en.type.name).to.be.equal('String');
        expect(en.required).to.be.true;
        expect(en.trim).to.be.true;
        expect(en.index).to.be.true;
        expect(en.searchable).to.be.true;
        expect(en.fake).to.exist;
      });
    });

    describe('body', () => {
      it('should be an embedded subdocument', () => {
        const { body } = Content.schema.tree;
        const { instance } = Content.schema.paths.body;
        const { tree } = Content.schema.tree.body;

        expect(instance).to.be.equal('Embedded');
        expect(body).to.exist;
        expect(body).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.en).to.exist;
      });

      it('should have body `en` locale field', () => {
        const { instance } = Content.schema.paths.body.schema.paths.en;
        const { en } = Content.schema.tree.body.tree;

        expect(instance).to.be.equal('String');
        expect(en).to.exist;
        expect(en).to.be.an('object');
        expect(en.type).to.be.a('function');
        expect(en.type.name).to.be.equal('String');
        expect(en.required).to.be.true;
        expect(en.trim).to.be.true;
        expect(en.index).to.be.true;
        expect(en.searchable).to.be.true;
        expect(en.fake).to.exist;
      });
    });

    it('should have publishedAt field', () => {
      const { publishedAt } = Content.schema.tree;
      const { instance } = Content.schema.paths.publishedAt;

      expect(instance).to.be.equal('Date');
      expect(publishedAt).to.exist;
      expect(publishedAt).to.be.an('object');
      expect(publishedAt.type).to.be.a('function');
      expect(publishedAt.type.name).to.be.equal('Date');
      expect(publishedAt.index).to.be.true;
    });

    it('should have extras field', () => {
      const { extras } = Content.schema.tree;
      const { instance } = Content.schema.paths.extras;

      expect(instance).to.be.equal('Mixed');
      expect(extras).to.exist;
      expect(extras).to.be.an('object');
      expect(extras.type).to.be.a('function');
      expect(extras.type.name).to.be.equal('Mixed');
    });
  });
});
