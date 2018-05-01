'use strict';


/**
 * @module majifix-content
 * @name Content
 * @description A representation of common information 
 * (i.e FAQ, Fee, Tarrifs etc) that are published by a jurisdiction 
 * for general public
 *
 * @see  {@link https://en.wikipedia.org/wiki/Content_(media)}
 * @see  {@link https://en.wikipedia.org/wiki/FAQ}
 * @see  {@link https://en.wikipedia.org/wiki/Fee}
 * @see  {@link https://simple.wikipedia.org/wiki/Tariff}
 * @author lally elias <lallyelias87@mail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */


/*** dependencies */
const _ = require('lodash');
const mongoose = require('mongoose');
const localize = require('mongoose-locale-schema');
const actions = require('mongoose-rest-actions');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


/*** local constants */
const DEFAULT_LOCALE = 'en';
const DEFAULT_GROUP = 'Post';
const LOCALES = [DEFAULT_LOCALE];
const GROUPS = [DEFAULT_GROUP, 'FAQ', 'Tariff'];


/*** declarations */
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
   *              This is applicable where multiple jurisdiction(s) utilize
   *              same majifix system(or platform)
   *
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   * 
   */
  jurisdiction: {
    type: ObjectId,
    ref: 'Jurisdiction',
    autoset: true,
    exists: true,
    autopopulate: true,
    index: true
  },


  /**
   * @name group
   * @description Human readable group of the content e.g FAQ, Fee etc.
   * It used as a handle to refer content of same kind or category.
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  group: {
    type: String,
    required: true,
    trim: true,
    index: true,
    searchable: true,
    enum: GROUPS,
    default: DEFAULT_GROUP
  },


  /**
   * @name type
   * @description Human readable type of the content. It is translatable
   * value of content set for different locales. 
   * Commonly used for presenting headers, sections etc for content 
   * of same type.
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  type: localize({
    type: String,
    required: true,
    trim: true,
    index: true,
    searchable: true,
    locales: locales,
    default: DEFAULT_GROUP
  }),


  /**
   * @name title
   * @description Human readable title of the content.
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  title: localize({
    type: String,
    trim: true,
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
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  body: localize({
    type: String,
    trim: true,
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
   * @type {Object}
   * @private
   * @since 0.1.0
   * @version 0.1.0
   */
  publishedAt: {
    type: Date,
    index: true
  }

}, { timestamps: true, emitIndexErrors: true });



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
ContentSchema.statics.DEFAULT_GROUP = DEFAULT_GROUP;
ContentSchema.statics.LOCALES = LOCALES;
ContentSchema.statics.GROUPS = GROUPS;



/*** export Content model */
module.exports = mongoose.model('Content', ContentSchema);