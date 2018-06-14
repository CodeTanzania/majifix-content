'use strict';


/**
 * @apiDefine Content  Content
 *
 * @apiDescription A representation of common information
 * (i.e FAQ, Fee, Tariffs etc) that are published by a jurisdiction
 * for general public
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 1.0.0
 * @public
 */


/**
 * @apiDefine Content
 * @apiSuccess {String} _id Unique content identifier
 * @apiSuccess {String} [jurisdiction = undefined] jurisdiction under
 * which this content belongs
 * @apiSuccess {Object} type Content type i.e FAQ, Tariff etc
 * @apiSuccess {String} [type.en] Content type in english
 * @apiSuccess {Object} title Content title
 * @apiSuccess {String} [title.en] Content title in english
 * @apiSuccess {Object} body Content body
 * @apiSuccess {String} [body.en] Content body in english
 * @apiSuccess {Date} publishedAt Date when content was published
 * @apiSuccess {Date} createdAt Date when content was created
 * @apiSuccess {Date} updatedAt Date when content was last updated
 *
 */


/**
 * @apiDefine Contents
 * @apiSuccess {Object[]} data List of contents
 * @apiSuccess {String} data._id Unique content identifier
 * @apiSuccess {String} [data.jurisdiction = undefined] jurisdiction under
 * which this content belongs
 * @apiSuccess {Object} data.type Content type i.e FAQ, Tariff etc
 * @apiSuccess {String} [data.type.en] Content type in english
 * @apiSuccess {Object} data.title Content title
 * @apiSuccess {String} [data.title.en] Content title in english
 * @apiSuccess {Object} data.body Content body
 * @apiSuccess {String} [data.body.en] Content body in english
 * @apiSuccess {Date} data.publishedAt Date when content was published
 * @apiSuccess {Date} data.createdAt Date when content was created
 * @apiSuccess {Date} data.updatedAt Date when content was last updated
 * @apiSuccess {Number} total Total number of client
 * @apiSuccess {Number} size Number of client returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest content
 * was last modified
 */


/**
 * @apiDefine ContentSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "_id": "5ae8266ad56112713720f072",
 *   "jurisdiction": {
 *     "_id": "5af3218b28d3615ed0f551d3",
 *     "color": "#A72ED3",
 *     "code": "08588014",
 *     "name": "Guatemala"
 *   },
 *   "type":
 *   {
 *     "en": "FAQ",
 *     "sw": "FAQ"
 *   },
 *   "title":
 *   {
 *     "en": "Laborum molestiae et modi qui officiis voluptates et.",
 *     "sw": "Odio nisi delectus qui excepturi voluptate in incidunt."
 *   },
 *   "body":
 *   {
 *     "en": "Sed ut velit quia. Enim sed labore facilis asperiores quia.",
 *     "sw": "Accusantium rerum exercitationem dolores debitis tempora ut sunt est dolor."
 *   },
 *   "publishedAt": "2018-05-01T08:33:45.505Z",
 *   "createdAt": "2018-05-01T08:33:46.032Z",
 *   "updatedAt": "2018-05-01T08:33:46.032Z"
 * }
 *
 */


/**
 * @apiDefine ContentsSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "data": [{
 *        "_id": "5ae8266ad56112713720f072",
 *        "jurisdiction": {
 *          "_id": "5af3218b28d3615ed0f551d3",
 *          "code": "08588014",
 *          "name": "Guatemala"
 *        },
 *        "type":
 *        {
 *          "en": "FAQ",
 *          "sw": "FAQ"
 *        },
 *        "title":
 *        {
 *          "en": "Laborum molestiae et modi qui officiis voluptates et.",
 *          "sw": "Odio nisi delectus qui excepturi voluptate in incidunt."
 *        },
 *        "body":
 *        {
 *          "en": "Sed ut velit quia. Enim sed labore facilis asperiores quia.",
 *          "sw": "Accusantium rerum exercitationem dolores debitis tempora ut sunt est dolor."
 *        },
 *        "publishedAt": "2018-05-01T08:33:45.505Z",
 *        "createdAt": "2018-05-01T08:33:46.032Z",
 *        "updatedAt": "2018-05-01T08:33:46.032Z"
 *     }],
 *     "total": 10,
 *     "size": 1,
 *     "limit": 1,
 *     "skip": 0,
 *     "page": 1,
 *     "pages": 10,
 *     "lastModified": "Mon, 30 Apr 2018 12:33:58 GMT"
 * }
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const Router = require('@lykmapipo/express-common').Router;
const { env } = require('@codetanzania/majifix-common');


/* local constants */
const API_VERSION = env.API_VERSION;
const PATH_LIST = '/contents';
const PATH_SINGLE = '/contents/:id';
const PATH_JURISDICTION = '/jurisdictions/:jurisdiction/contents';


/* declarations */
const Content = require(path.join(__dirname, 'content.model'));
const router = new Router({ version: API_VERSION });


/**
 * @api {get} /contents List Contents
 * @apiVersion 1.0.0
 * @apiName GetContents
 * @apiGroup Content
 * @apiDescription Returns a list of contents
 * @apiUse RequestHeaders
 * @apiUse Contents
 *
 * @apiUse RequestHeadersExample
 * @apiUse ContentsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getContents(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);
  console.log(options);

  //query content
  Content
    .get(options, function onGetContents(error, results) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {

        //merge content types
        results.types = Content.TYPES;

        response.status(200);
        response.json(results);
      }

    });

});


/**
 * @api {post} /contents Create New Content
 * @apiVersion 1.0.0
 * @apiName PostContent
 * @apiGroup Content
 * @apiDescription Create new content
 * @apiUse RequestHeaders
 * @apiUse Content
 *
 * @apiUse RequestHeadersExample
 * @apiUse ContentSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, function postContent(request, response, next) {

  //obtain request body
  const body = _.merge({}, request.body);

  //create content
  Content
    .post(body, function onPostContent(error, created) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(201);
        response.json(created);
      }

    });

});


/**
 * @api {get} /contents/:id Get Existing Content
 * @apiVersion 1.0.0
 * @apiName GetContent
 * @apiGroup Content
 * @apiDescription Get existing content
 * @apiUse RequestHeaders
 * @apiUse Content
 *
 * @apiUse RequestHeadersExample
 * @apiUse ContentSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, function getContent(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain content id
  options._id = request.params.id;

  //query content by id
  Content
    .getById(options, function onGetContent(error, found) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(found);
      }

    });

});


/**
 * @api {patch} /contents/:id Patch Existing Content
 * @apiVersion 1.0.0
 * @apiName PatchContent
 * @apiGroup Content
 * @apiDescription Patch existing content
 * @apiUse RequestHeaders
 * @apiUse Content
 *
 * @apiUse RequestHeadersExample
 * @apiUse ContentSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, function patchContent(request, response, next) {

  //obtain content id
  const { id } = request.params;

  //obtain request body
  const patches = _.merge({}, request.body);

  //update content
  Content
    .patch(id, patches, function onPatchContent(error, patched) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(patched);
      }

    });

});


/**
 * @api {put} /contents/:id Put Existing Content
 * @apiVersion 1.0.0
 * @apiName PutContent
 * @apiGroup Content
 * @apiDescription Put existing content
 * @apiUse RequestHeaders
 * @apiUse Content
 *
 * @apiUse RequestHeadersExample
 * @apiUse ContentSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, function putContent(request, response, next) {

  //obtain content id
  const { id } = request.params;

  //obtain request body
  const updates = _.merge({}, request.body);

  //update content
  Content
    .put(id, updates, function onPutContent(error, updated) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(updated);
      }

    });

});


/**
 * @api {delete} /contents/:id Delete Existing Content
 * @apiVersion 1.0.0
 * @apiName DeleteContent
 * @apiGroup Content
 * @apiDescription Delete existing content
 * @apiUse RequestHeaders
 * @apiUse Content
 *
 * @apiUse RequestHeadersExample
 * @apiUse ContentSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router
  .delete(PATH_SINGLE, function deleteContent(request, response, next) {

    //obtain content id
    const { id } = request.params;

    //delete existing content
    Content
      .del(id, function onDeleteContent(error, deleted) {

        //forward error
        if (error) {
          next(error);
        }

        //handle response
        else {
          response.status(200);
          response.json(deleted);
        }

      });

  });


/**
 * @api {get} /jurisdictions/:jurisdiction/contents List Jurisdiction Contents
 * @apiVersion 1.0.0
 * @apiName GetJurisdictionContents
 * @apiGroup Content
 * @apiDescription Returns a list of specified jurisdiction contents
 * @apiUse RequestHeaders
 * @apiUse Contents
 *
 * @apiUse RequestHeadersExample
 * @apiUse ContentsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_JURISDICTION, function getContents(request, response, next) {

  //obtain request options
  const { jurisdiction } = request.params;
  const filter =
    (jurisdiction ? { filter: { jurisdiction: jurisdiction } } : {});
  const options =
    _.merge({}, filter, request.mquery);

  //query specific jurisdiction contents
  Content
    .get(options, function onGetContents(error, results) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {

        //merge content types
        results.types = Content.TYPES;

        response.status(200);
        response.json(results);
      }

    });

});


/* expose content router */
module.exports = router;
