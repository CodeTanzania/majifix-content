import { SchemaTypes } from '@lykmapipo/mongoose-common';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import Content from '../../src/content.model';

describe('Content Schema', () => {
  it('should have jurisdiction field', () => {
    const jurisdiction = Content.path('jurisdiction');

    expect(jurisdiction).to.exist;
    expect(jurisdiction).to.be.instanceof(SchemaTypes.ObjectID);
    expect(jurisdiction.options).to.exist;
    expect(jurisdiction.options).to.be.an('object');
    expect(jurisdiction.options.type).to.be.a('function');
    expect(jurisdiction.options.type.name).to.be.equal('ObjectId');
    expect(jurisdiction.options.ref).to.exist.and.be.equal('Jurisdiction');
    expect(jurisdiction.options.exists).to.exist.and.be.an('object');
    expect(jurisdiction.options.autopopulate).to.exist.and.an('object');
    expect(jurisdiction.options.index).to.be.true;
  });

  it('should have type field', () => {
    const type = Content.path('type');

    expect(type).to.exist;
    expect(type).to.be.instanceof(SchemaTypes.String);
    expect(type.options).to.exist;
    expect(type.options.enum).to.exist;
    expect(type.options).to.be.an('object');
    expect(type.options.type).to.be.a('function');
    expect(type.options.type.name).to.be.a('String');
    expect(type.options.required).to.be.true;
    expect(type.options.trim).to.be.true;
    expect(type.options.index).to.be.true;
    expect(type.options.searchable).to.be.true;
    expect(type.options.taggable).to.be.true;
    expect(type.options.exportable).to.be.true;
    expect(type.options.fake).to.be.true;
    expect(type.options.index).to.be.true;
  });

  it('should have title `en` locale field', () => {
    const title = Content.path('title');
    const en = Content.path('title.en');

    expect(title).to.exist;
    expect(en.options).to.exist;
    expect(en).to.be.instanceof(SchemaTypes.String);
    expect(en.options).to.be.an('object');
    expect(en.options.type).to.be.a('function');
    expect(en.options.type.name).to.be.equal('String');
    expect(en.options.required).to.be.true;
    expect(en.options.trim).to.be.true;
    expect(en.options.index).to.be.true;
    expect(en.options.taggable).to.be.true;
    expect(en.options.searchable).to.be.true;
    expect(en.options.exportable).to.be.true;
    expect(en.options.fake).to.exist;
  });

  it('should have body `en` locale field', () => {
    const body = Content.path('body');
    const en = Content.path('body.en');

    expect(body).to.exist;
    expect(en.options).to.exist;
    expect(en).to.be.instanceof(SchemaTypes.String);
    expect(en.options).to.be.an('object');
    expect(en.options.type).to.be.a('function');
    expect(en.options.type.name).to.be.equal('String');
    expect(en.options.required).to.be.true;
    expect(en.options.trim).to.be.true;
    expect(en.options.index).to.be.true;
    expect(en.options.taggable).to.be.true;
    expect(en.options.searchable).to.be.true;
    expect(en.options.exportable).to.be.true;
    expect(en.options.fake).to.exist;
  });

  it('should have publishedAt field', () => {
    const publishedAt = Content.path('publishedAt');

    expect(publishedAt).to.exist;
    expect(publishedAt).to.be.instanceof(SchemaTypes.Date);
    expect(publishedAt.options).to.exist;
    expect(publishedAt.options).to.be.an('object');
    expect(publishedAt.options.type).to.be.a('function');
    expect(publishedAt.options.type.name).to.be.equal('Date');
    expect(publishedAt.options.index).to.be.true;
  });

  it('should have extras field', () => {
    const extras = Content.path('extras');

    expect(extras).to.exist;
    expect(extras).to.be.instanceof(SchemaTypes.Mixed);
    expect(extras.options).to.exist;
    expect(extras.options).to.be.an('object');
    expect(extras.options.type).to.be.a('function');
    expect(extras.options.type.name).to.be.equal('Mixed');
  });
});
