import { getString } from '@lykmapipo/env';
import {
  getFor,
  schemaFor,
  downloadFor,
  getByIdFor,
  postFor,
  patchFor,
  putFor,
  deleteFor,
  Router,
} from '@lykmapipo/express-rest-actions';
import Content from './content.model';

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

/* expose router */
export default router;
