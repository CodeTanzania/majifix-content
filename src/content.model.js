import _ from 'lodash';
import { idOf, mergeObjects } from '@lykmapipo/common';
import { getString, getStringSet } from '@lykmapipo/env';
import {
  createSchema,
  model,
  ObjectId,
  Mixed,
} from '@lykmapipo/mongoose-common';
import {
  localize,
  localizedIndexesFor,
  localizedKeysFor,
  localizedValuesFor,
} from 'mongoose-locale-schema';
import actions from 'mongoose-rest-actions';
import exportable from '@lykmapipo/mongoose-exportable';
import { Jurisdiction } from '@codetanzania/majifix-jurisdiction';
import {
  POPULATION_MAX_DEPTH,
  MODEL_NAME_CONTENT,
  COLLECTION_NAME_CONTENT,
} from '@codetanzania/majifix-common';

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
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
ContentSchema.pre('validate', function preValidate(next) {
  return this.preValidate(next);
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
  return done();
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
export default model(MODEL_NAME_CONTENT, ContentSchema);
