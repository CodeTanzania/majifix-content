'use strict';

const common = require('@lykmapipo/common');
const env = require('@lykmapipo/env');
const expressCommon = require('@lykmapipo/express-common');
const _ = require('lodash');
const mongooseCommon = require('@lykmapipo/mongoose-common');
const mongooseLocaleSchema = require('mongoose-locale-schema');
const actions = require('mongoose-rest-actions');
const exportable = require('@lykmapipo/mongoose-exportable');
const majifixJurisdiction = require('@codetanzania/majifix-jurisdiction');
const majifixCommon = require('@codetanzania/majifix-common');
const expressRestActions = require('@lykmapipo/express-rest-actions');

/* constants */
const DEFAULT_CONTENT_TYPE = env.getString('DEFAULT_CONTENT_TYPE', 'Post');
const CONTENT_TYPES = env.getStringSet('CONTENT_TYPES', [DEFAULT_CONTENT_TYPE]);
const OPTION_SELECT = { jurisdiction: 1, type: 1, title: 1 };
const OPTION_AUTOPOPULATE = {
  select: OPTION_SELECT,
  maxDepth: majifixCommon.POPULATION_MAX_DEPTH,
};
const SCHEMA_OPTIONS = { collection: majifixCommon.COLLECTION_NAME_CONTENT };
const INDEX_UNIQUE = {
  jurisdiction: 1,
  type: 1,
  ...mongooseLocaleSchema.localizedIndexesFor('title'),
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
const ContentSchema = mongooseCommon.createSchema(
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
      type: mongooseCommon.ObjectId,
      ref: majifixJurisdiction.Jurisdiction.MODEL_NAME,
      exists: { refresh: true, select: majifixJurisdiction.Jurisdiction.OPTION_SELECT },
      autopopulate: majifixJurisdiction.Jurisdiction.OPTION_AUTOPOPULATE,
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
    title: mongooseLocaleSchema.localize({
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
    body: mongooseLocaleSchema.localize({
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
      type: mongooseCommon.Mixed,
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
  this.title = mongooseLocaleSchema.localizedValuesFor(this.title);

  // ensure body for all locales
  this.body = common.mergeObjects(
    mongooseLocaleSchema.localizedValuesFor(this.title),
    mongooseLocaleSchema.localizedValuesFor(this.body)
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
ContentSchema.statics.MODEL_NAME = majifixCommon.MODEL_NAME_CONTENT;
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
  const titles = mongooseLocaleSchema.localizedKeysFor('title');

  const copyOfSeed = seed;
  copyOfSeed.title = mongooseLocaleSchema.localizedValuesFor(seed.title);

  const criteria = common.idOf(copyOfSeed)
    ? _.pick(copyOfSeed, '_id')
    : _.pick(copyOfSeed, 'jurisdiction', 'type', ...titles);
  return criteria;
};

/* export content model */
const Content = mongooseCommon.model(majifixCommon.MODEL_NAME_CONTENT, ContentSchema);

/* constants */
const API_VERSION = env.getString('API_VERSION', '1.0.0');
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
const router = new expressRestActions.Router({
  version: API_VERSION,
});

/**
 * @name GetContents
 * @memberof ContentHttpRouter
 * @description Returns a list of contents
 */
router.get(
  PATH_LIST,
  expressRestActions.getFor({
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
  expressRestActions.schemaFor({
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
  expressRestActions.downloadFor({
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
  expressRestActions.postFor({
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
  expressRestActions.getByIdFor({
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
  expressRestActions.patchFor({
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
  expressRestActions.putFor({
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
  expressRestActions.deleteFor({
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
  expressRestActions.getFor({
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
const info = common.pkg(
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
const apiVersion = env.apiVersion();

Object.defineProperty(exports, 'start', {
  enumerable: true,
  get: function () {
    return expressCommon.start;
  }
});
exports.Content = Content;
exports.apiVersion = apiVersion;
exports.contentRouter = router;
exports.info = info;
