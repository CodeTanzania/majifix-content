'use strict';


/**
 * @module Content
 * @name Content
 * @description A representation of common information
 * (i.e FAQ, Fee, Tarrifs etc) that are published by a jurisdiction
 * for general public
 *
 * @requires https://github.com/CodeTanzania/majifix-jurisdiction
 * @see {@link https://github.com/CodeTanzania/majifix-jurisdiction|Jurisdiction}
 * @see {@link https://en.wikipedia.org/wiki/Content_(media)}
 * @see {@link https://en.wikipedia.org/wiki/FAQ}
 * @see {@link https://en.wikipedia.org/wiki/Fee}
 * @see {@link https://simple.wikipedia.org/wiki/Tariff}
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


/*** dependencies */
const _ = require('lodash');
const mongoose = require('mongoose');
const localize = require('mongoose-locale-schema');
const actions = require('mongoose-rest-actions');
const { Jurisdiction } = require('majifix-jurisdiction');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


/*** local constants */
const DEFAULT_LOCALE = (process.env.DEFAULT_LOCALE || 'en');
const DEFAULT_TYPE = 'Post';
const LOCALES = [DEFAULT_LOCALE];
const TYPES = [DEFAULT_TYPE, 'FAQ', 'Tariff'];
const MODEL_NAME = 'Content';


/* declarations */
let locales = _.get(process, 'env.LOCALES', '').split(',');
locales = ([].concat(LOCALES).concat(locales));
locales = _.compact(locales);
locales = _.uniq(locales);
locales = _.map(locales, function (locale) {
  let option = { name: locale };
  if (locale === DEFAULT_LOCALE) {
    option.required = true;
  }
  return option;
});

const SCHEMA_OPTIONS  = ({ timestamps: true, emitIndexErrors: true });


/**
 * @name ContentSchema
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const ContentSchema = new Schema({
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
   * @property {boolean} autoset - allow to set id from full object
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - jurisdiction population options
   * @property {boolean} index - ensure database index
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  jurisdiction: {
    type: ObjectId,
    ref: Jurisdiction.MODEL_NAME,
    autoset: true,
    exists: true,
    autopopulate: Jurisdiction.OPTION_AUTOPOPULATE,
    index: true
  },


  /**
   * @name type
   * @description Human readable type of the content. It is translatable
   * value of content set for different locales.
   * Commonly used for presenting headers, sections etc for content
   * of same type.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {array}  locales - list of supported locales
   * @property {object} fake - fake data generator options
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  type: localize({
    type: String,
    trim: true,
    required: true,
    index: true,
    searchable: true,
    locales: locales,
    default: DEFAULT_TYPE,
    fake: true
  }),


  /**
   * @name title
   * @description Human readable title of the content.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {array}  locales - list of supported locales
   * @property {object} fake - fake data generator options
   */
  title: localize({
    type: String,
    trim: true,
    required: true,
    index: true,
    searchable: true,
    locales: locales,
    fake: {
      generator: 'lorem',
      type: 'sentence'
    }
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
   * @property {boolean} searchable - allow for searching
   * @property {array}  locales - list of supported locales
   * @property {object} fake - fake data generator options
   */
  body: localize({
    type: String,
    trim: true,
    required: true,
    index: true,
    searchable: true,
    locales: locales,
    fake: {
      generator: 'lorem',
      type: 'paragraph'
    }
  }),


  /**
   * @name publishedAt
   * @description Flag whether a content has been published for
   * general public.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} index - ensure database index
   */
  publishedAt: {
    type: Date,
    index: true
  }

}, SCHEMA_OPTIONS);



//Instance

/**
 * @name afterPost
 * @description pre save account logics
 * @param  {Function} done callback to invoke on success or error
 */
ContentSchema.methods.afterPost = function (done) {
  //TODO in background
  //TODO notify general public(email, sms, push notification)
  //TODO Jurisdiction.notify(content);
  done();
};



//Plugins

/*** use mongoose rest actions*/
ContentSchema.plugin(actions);


//Statics
ContentSchema.statics.DEFAULT_LOCALE = DEFAULT_LOCALE;
ContentSchema.statics.DEFAULT_TYPE = DEFAULT_TYPE;
ContentSchema.statics.LOCALES = LOCALES;
ContentSchema.statics.TYPES = TYPES;
ContentSchema.statics.MODEL_NAME = MODEL_NAME;



/*** export Content model */
module.exports = mongoose.model(MODEL_NAME, ContentSchema);