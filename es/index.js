import { mergeObjects, idOf, pkg } from '@lykmapipo/common';
import { getString, getStringSet, apiVersion as apiVersion$1 } from '@lykmapipo/env';
export { start } from '@lykmapipo/express-common';
import _ from 'lodash';
import { model, createSchema, ObjectId, Mixed } from '@lykmapipo/mongoose-common';
import { localizedIndexesFor, localize, localizedValuesFor, localizedKeysFor } from 'mongoose-locale-schema';
import actions from 'mongoose-rest-actions';
import exportable from '@lykmapipo/mongoose-exportable';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import { MODEL_NAME_CONTENT, POPULATION_MAX_DEPTH, COLLECTION_NAME_CONTENT } from '@codetanzania/majifix-common';
import { Router, getFor, schemaFor, downloadFor, postFor, getByIdFor, patchFor, putFor, deleteFor } from '@lykmapipo/express-rest-actions';

/* constants */
const DEFAULT_CONTENT_TYPE = getString('DEFAULT_CONTENT_TYPE', 'Post');
const CONTENT_TYPES = getStringSet('CONTENT_TYPES', [DEFAULT_CONTENT_TYPE]);
const OPTION_SELECT = { jurisdiction: 1, type: 1, title: 1 };
const OPTION_AUTOPOPULATE = {
  select: OPTION_SELECT,
  maxDepth: POPULATION_MAX_DEPTH,
};
const SCHEMA_OPTIONS = { collection: COLLECTION_NAME_CONTENT };
const INDEX_UNIQUE = {
  jurisdiction: 1,
  type: 1,
  ...localizedIndexesFor('title'),
};

/**
 * @module Content
 * @name Content
 * @description A representation of common information
 * (i.e FAQ, Fee, Tariffs etc) that are published by a jurisdiction
 * for general public
 *
 * @requires https://github.com/CodeTanzania/majifix-jurisdiction
 * @see {@link https://github.com/CodeTanzania/majifix-jurisdiction|Jurisdiction}
 * @see {@link https://en.wikipedia.org/wiki/Content_(media)}
 * @see {@link https://en.wikipedia.org/wiki/FAQ}
 * @see {@link https://en.wikipedia.org/wiki/Fee}
 * @see {@link https://simple.wikipedia.org/wiki/Tariff}
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 *
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const ContentSchema = createSchema(
  {
    /**
     * @name jurisdiction
     * @description jurisdiction under which content belongs.
     *
     * This is applicable where multiple jurisdiction(s) utilize
     * same majifix system(or platform)
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - jurisdiction population options
     * @property {boolean} index - ensure database index
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    jurisdiction: {
      type: ObjectId,
      ref: Jurisdiction.MODEL_NAME,
      exists: { refresh: true, select: Jurisdiction.OPTION_SELECT },
      autopopulate: Jurisdiction.OPTION_AUTOPOPULATE,
      index: true,
    },

    /**
     * @name type
     * @description Human readable type of the content. e.g Post, Tarrif,
     * FAQ etc.
     *
     * Commonly used for presenting headers, sections etc for content
     * of same type.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} exportable - allow field to be exported
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    type: {
      type: String,
      trim: true,
      required: true,
      index: true,
      taggable: true,
      exportable: true,
      searchable: true,
      default: DEFAULT_CONTENT_TYPE,
      enum: CONTENT_TYPES,
      fake: true,
    },

    /**
     * @name title
     * @description Human readable title of the content.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} exportable - allow field to be exported
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    title: localize({
      type: String,
      trim: true,
      required: true,
      index: true,
      taggable: true,
      exportable: true,
      searchable: true,
      fake: {
        generator: 'lorem',
        type: 'sentence',
      },
    }),

    /**
     * @name body
     * @description Human readable body of the content.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} exportable - allow field to be exported
     * @property {boolean} searchable - allow for searching
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    body: localize({
      type: String,
      trim: true,
      required: true,
      index: true,
      taggable: true,
      exportable: true,
      searchable: true,
      fake: {
        generator: 'lorem',
        type: 'paragraph',
      },
    }),

    /**
     * @name publishedAt
     * @description Flag whether a content has been published for
     * general public.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} index - ensure database index
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    publishedAt: {
      type: Date,
      index: true,
    },

    /**
     * @name extras
     * @description Additional content.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     *
     * @since 0.1.0
     * @version 1.0.0
     * @instance
     */
    extras: {
      type: Mixed,
    },
  },
  SCHEMA_OPTIONS,
  actions,
  exportable
);

/*
 *------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------
 */

/**
 * @name index
 * @description ensure unique compound index on content type, title
 * and jurisdiction to force unique content definition
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
ContentSchema.index(INDEX_UNIQUE, { unique: true });

/*
 *------------------------------------------------------------------------------
 * Hooks
 *------------------------------------------------------------------------------
 */

/**
 * @name validate
 * @description content schema pre validation hook
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
ContentSchema.pre('validate', function preValidate(done) {
  return this.preValidate(done);
});

/*
 *------------------------------------------------------------------------------
 * Instance
 *------------------------------------------------------------------------------
 */

/**
 * @name preValidate
 * @description content schema pre validation hook logic
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 * @since 0.1.0
 * @version 1.0.0
 * @instance
 */
ContentSchema.methods.preValidate = function preValidate(done) {
  // ensure title  for all locales
  this.title = localizedValuesFor(this.title);

  // ensure body for all locales
  this.body = mergeObjects(
    localizedValuesFor(this.title),
    localizedValuesFor(this.body)
  );

  // continue
  return done(null, this);
};

/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */

/* static constants */
ContentSchema.statics.DEFAULT_CONTENT_TYPE = DEFAULT_CONTENT_TYPE;
ContentSchema.statics.CONTENT_TYPES = CONTENT_TYPES;
ContentSchema.statics.MODEL_NAME = MODEL_NAME_CONTENT;
ContentSchema.statics.OPTION_SELECT = OPTION_SELECT;
ContentSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;

/**
 * @name prepareSeedCriteria
 * @function prepareSeedCriteria
 * @description define seed data criteria
 * @param {object} seed content to be seeded
 * @returns {object} packed criteria for seeding
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.2.0
 * @version 0.1.0
 * @static
 */
ContentSchema.statics.prepareSeedCriteria = seed => {
  const titles = localizedKeysFor('title');

  const copyOfSeed = seed;
  copyOfSeed.title = localizedValuesFor(seed.title);

  const criteria = idOf(copyOfSeed)
    ? _.pick(copyOfSeed, '_id')
    : _.pick(copyOfSeed, 'jurisdiction', 'type', ...titles);
  return criteria;
};

/* export content model */
var Content = model(MODEL_NAME_CONTENT, ContentSchema);

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/contents/:id';
const PATH_LIST = '/contents';
const PATH_EXPORT = '/contents/export';
const PATH_SCHEMA = '/contents/schema/';
const PATH_JURISDICTION = '/jurisdictions/:jurisdiction/contents';

/**
 * @name ContentHttpRouter
 * @namespace ContentHttpRouter
 *
 * @description A representation of common information
 * (i.e FAQ, Fee, Tariffs etc) that are published by a jurisdiction
 * for general public
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 1.0.0
 * @public
 */
const router = new Router({
  version: API_VERSION,
});

/**
 * @name GetContents
 * @memberof ContentHttpRouter
 * @description Returns a list of contents
 */
router.get(
  PATH_LIST,
  getFor({
    get: (options, done) => Content.get(options, done),
  })
);

/**
 * @name GetContentSchema
 * @memberof ContentHttpRouter
 * @description Returns content json schema definition
 */
router.get(
  PATH_SCHEMA,
  schemaFor({
    getSchema: (query, done) => {
      const jsonSchema = Content.jsonSchema();
      return done(null, jsonSchema);
    },
  })
);

/**
 * @name ExportContents
 * @memberof ContentHttpRouter
 * @description Export contents as csv
 */
router.get(
  PATH_EXPORT,
  downloadFor({
    download: (options, done) => {
      const fileName = `contents_exports_${Date.now()}.csv`;
      const readStream = Content.exportCsv(options);
      return done(null, { fileName, readStream });
    },
  })
);

/**
 * @name PostContent
 * @memberof ContentHttpRouter
 * @description Create new content
 */
router.post(
  PATH_LIST,
  postFor({
    post: (body, done) => Content.post(body, done),
  })
);

/**
 * @name GetContent
 * @memberof ContentHttpRouter
 * @description Get existing content
 */
router.get(
  PATH_SINGLE,
  getByIdFor({
    getById: (options, done) => Content.getById(options, done),
  })
);

/**
 * @name PatchContent
 * @memberof ContentHttpRouter
 * @description Patch existing content
 */
router.patch(
  PATH_SINGLE,
  patchFor({
    patch: (options, done) => Content.patch(options, done),
  })
);

/**
 * @name PutContent
 * @memberof ContentHttpRouter
 * @description Put existing content
 */
router.put(
  PATH_SINGLE,
  putFor({
    put: (options, done) => Content.put(options, done),
  })
);

/**
 * @name DeleteContent
 * @memberof ContentHttpRouter
 * @description Delete existing content
 */
router.delete(
  PATH_SINGLE,
  deleteFor({
    del: (options, done) => Content.del(options, done),
    soft: true,
  })
);

/**
 * @name GetJurisdictionContents
 * @memberof ContentHttpRouter
 * @description Returns a list of contents of specified jurisdiction
 */
router.get(
  PATH_JURISDICTION,
  getFor({
    get: (options, done) => Content.get(options, done),
  })
);

/**
 * @name majifix-content
 * @description A representation of common information
 * (i.e FAQ, Fee, Tarrifs etc) that are published by a jurisdiction
 * for general public
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @license MIT
 * @example
 *
 * const { Content, start } = require('@codetanzania/majifix-content');
 * start(error => { ... });
 *
 */

/**
 * @name info
 * @description package information
 * @type {object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
const info = pkg(
  `${__dirname}/package.json`,
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
);

/**
 * @name apiVersion
 * @description http router api version
 * @type {string}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
const apiVersion = apiVersion$1();

export { Content, apiVersion, router as contentRouter, info };
