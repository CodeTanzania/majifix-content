'use strict';


/**
 * @module majifix-content
 * @apiDefine Content  Content
 *
 * @apiDescription A representation of common information 
 * (i.e FAQ, Fee, Tarrifs etc) that are published by a jurisdiction 
 * for general public
 *
 * @see {@link http://apidocjs.com/}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
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
 * 
 */


/**
 * @apiDefine ContentSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "_id": "5ae8266ad56112713720f072",
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
 *     "total": 20,
 *     "size": 10,
 *     "limit": 10,
 *     "skip": 0,
 *     "page": 1,
 *     "pages": 2,
 *     "lastModified": "Mon, 30 Apr 2018 12:33:58 GMT"
 * }
 * 
 */


/**
 * @apiDefine ContentRequestHeader
 *
 * @apiHeader {String} [Accept=application/json] Accepted content type
 * @apiHeader {String} Authorization Authorization token
 * @apiHeader {String} [Accept-Encoding='gzip, deflate'] Accepted encoding type
 *
 * @see {@link http://apidocjs.com/}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */


/**
 * @apiDefine ContentRequestHeaderExample
 *
 * @apiHeaderExample {json} Header-Example:
 *   {
 *     "Accept": "application/json"
 *     "Authorization": "Bearer ey6utFreRdy5"
 *     "Accept-Encoding": "gzip, deflate"
 *   }
 *
 * @see {@link http://apidocjs.com/}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */


/*** dependencies */
const path = require('path');
const _ = require('lodash');
const Router = require('@lykmapipo/express-common').Router;


/*** local constants */
const API_VERSION = process.env.API_VERSION || '1.0.0';


/*** declarations */
const Content = require(path.join(__dirname, 'content.model'));
const router = new Router({ version: API_VERSION });


/*** expose content model */
Object.defineProperty(router, 'Model', {
  get() {
    return Content;
  }
});



/**
 * @api {get} /contents List Contents
 * @apiVersion 1.0.0
 * @apiName GetContents
 * @apiGroup Content
 *  
 * @apiDescription Returns a list of contents
 *
 * @apiUse ContentRequestHeader
 *
 * @apiUse Contents
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-content.herokuapp.com/v1.0.0/contents
 *
 * @apiUse ContentRequestHeaderExample
 *
 * @apiUse ContentsSuccessResponse
 *      
 */
router.get('/contents', function getContents(request, response, next) {

  //TODO support multi locale filter

  //obtain request options
  const options = _.merge({}, request.mquery);

  Content
    .get(options, function onGetContents(error, results) {

      //foward error
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
 *  
 * @apiDescription Create new content
 *
 * @apiUse ContentRequestHeader
 *
 * @apiUse Content
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-content.herokuapp.com/v1.0.0/contents
 *
 * @apiUse ContentRequestHeaderExample
 *
 * @apiUse ContentSuccessResponse
 *  
 */
router.post('/contents', function postContent(request, response, next) {

  //obtain request body
  const body = _.merge({}, request.body);

  Content
    .post(body, function onPostContent(error, created) {

      //foward error
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
 *  
 * @apiDescription Get existing content
 *
 * @apiUse ContentRequestHeader
 *
 * @apiUse Content
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-content.herokuapp.com/v1.0.0/contents
 *
 * @apiUse ContentRequestHeaderExample
 *
 * @apiUse ContentSuccessResponse
 *   
 */
router.get('/contents/:id', function getContent(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain content id
  options._id = request.params.id;

  Content
    .getById(options, function onGetContent(error, found) {

      //foward error
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
 *  
 * @apiDescription Patch existing content
 *
 * @apiUse ContentRequestHeader
 *
 * @apiUse Content
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-content.herokuapp.com/v1.0.0/contents
 *
 * @apiUse ContentRequestHeaderExample
 *
 * @apiUse ContentSuccessResponse
 *   
 */
router.patch('/contents/:id', function patchContent(request, response, next) {

  //obtain content id
  const _id = request.params.id;

  //obtain request body
  const patches = _.merge({}, request.body);

  Content
    .patch(_id, patches, function onPatchContent(error, patched) {

      //foward error
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
 *  
 * @apiDescription Put existing content
 *
 * @apiUse ContentRequestHeader
 *
 * @apiUse Content
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-content.herokuapp.com/v1.0.0/contents
 *
 * @apiUse ContentRequestHeaderExample
 *
 * @apiUse ContentSuccessResponse
 *   
 */
router.put('/contents/:id', function putContent(request, response, next) {

  //obtain content id
  const _id = request.params.id;

  //obtain request body
  const updates = _.merge({}, request.body);

  Content
    .put(_id, updates, function onPutContent(error, updated) {

      //foward error
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
 *  
 * @apiDescription Delete existing content
 *
 * @apiUse ContentRequestHeader
 *
 * @apiUse Content
 *
 * @apiExample {curl} curl:
 *   curl -i https://majifix-content.herokuapp.com/v1.0.0/contents
 *
 * @apiUse ContentRequestHeaderExample
 *
 * @apiUse ContentSuccessResponse
 *   
 */
router.delete('/contents/:id', function deleteContent(request, response, next) {

  //obtain content id
  const _id = request.params.id;

  Content
    .del(_id, function onDeleteContent(error, deleted) {

      //foward error
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


/*** expose router */
module.exports = router;