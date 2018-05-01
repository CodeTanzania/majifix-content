'use strict';


/*** dependencies */
const path = require('path');
const expect = require('chai').expect;

/*** declarations */
const Content =
  require(path.join(__dirname, '..', '..', 'lib', 'content.model'));


describe('Content', function () {

  describe('Schema', function () {

    it('should have jurisdiction field', function () {

      const jurisdiction = Content.schema.tree.jurisdiction;
      const instance = Content.schema.paths.jurisdiction.instance;

      expect(instance).to.be.equal('ObjectID');
      expect(jurisdiction).to.exist;
      expect(jurisdiction).to.be.an('object');
      expect(jurisdiction.type).to.be.a('function');
      expect(jurisdiction.type.name).to.be.equal('ObjectId');
      expect(jurisdiction.index).to.be.true;
      expect(jurisdiction.exists).to.be.true;
      expect(jurisdiction.autoset).to.be.true;
      expect(jurisdiction.autopopulate).to.be.true;

    });

    it('should have group field', function () {

      const group = Content.schema.tree.group;
      const instance = Content.schema.paths.group.instance;

      expect(instance).to.be.equal('String');
      expect(group).to.exist;
      expect(group).to.be.an('object');
      expect(group.type).to.be.a('function');
      expect(group.type.name).to.be.equal('String');
      expect(group.required).to.be.true;
      expect(group.trim).to.be.true;
      expect(group.index).to.be.true;
      expect(group.searchable).to.be.true;

    });

    describe('type', function () {

      it('should be an embedded subdocument', function () {

        const type = Content.schema.tree.type;
        const instance = Content.schema.paths.type.instance;
        const tree = Content.schema.tree.type.tree;

        expect(instance).to.be.equal('Embedded');
        expect(type).to.exist;
        expect(type).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.en).to.exist;

      });

      it('should have type `en` locale field', function () {

        const instance =
          Content.schema.paths.type.schema.paths.en.instance;
        const en = Content.schema.tree.type.tree.en;

        expect(instance).to.be.equal('String');
        expect(en).to.exist;
        expect(en).to.be.an('object');
        expect(en.type).to.be.a('function');
        expect(en.type.name).to.be.equal('String');
        expect(en.required).to.be.true;
        expect(en.trim).to.be.true;
        expect(en.index).to.be.true;
        expect(en.searchable).to.be.true;

      });

    });


    describe('title', function () {

      it('should be an embedded subdocument', function () {

        const title = Content.schema.tree.title;
        const instance = Content.schema.paths.title.instance;
        const tree = Content.schema.tree.title.tree;

        expect(instance).to.be.equal('Embedded');
        expect(title).to.exist;
        expect(title).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.en).to.exist;

      });

      it('should have title `en` locale field', function () {

        const instance =
          Content.schema.paths.title.schema.paths.en.instance;
        const en = Content.schema.tree.title.tree.en;

        expect(instance).to.be.equal('String');
        expect(en).to.exist;
        expect(en).to.be.an('object');
        expect(en.type).to.be.a('function');
        expect(en.type.name).to.be.equal('String');
        expect(en.required).to.be.true;
        expect(en.trim).to.be.true;
        expect(en.index).to.be.true;
        expect(en.searchable).to.be.true;

      });

    });


    describe('body', function () {

      it('should be an embedded subdocument', function () {

        const body = Content.schema.tree.body;
        const instance = Content.schema.paths.body.instance;
        const tree = Content.schema.tree.body.tree;

        expect(instance).to.be.equal('Embedded');
        expect(body).to.exist;
        expect(body).to.be.an('object');
        expect(tree).to.exist;
        expect(tree.en).to.exist;

      });

      it('should have body `en` locale field', function () {

        const instance =
          Content.schema.paths.body.schema.paths.en.instance;
        const en = Content.schema.tree.body.tree.en;

        expect(instance).to.be.equal('String');
        expect(en).to.exist;
        expect(en).to.be.an('object');
        expect(en.type).to.be.a('function');
        expect(en.type.name).to.be.equal('String');
        expect(en.required).to.be.true;
        expect(en.trim).to.be.true;
        expect(en.index).to.be.true;
        expect(en.searchable).to.be.true;

      });

    });


    it('should have publishedAt field', function () {

      const publishedAt = Content.schema.tree.publishedAt;
      const instance = Content.schema.paths.publishedAt.instance;

      expect(instance).to.be.equal('Date');
      expect(publishedAt).to.exist;
      expect(publishedAt).to.be.an('object');
      expect(publishedAt.type).to.be.a('function');
      expect(publishedAt.type.name).to.be.equal('Date');
      expect(publishedAt.index).to.be.true;

    });

  });

});