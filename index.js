'use strict';


/**
 * @name majifix-content
 * @description A representation of common information
 * (i.e FAQ, Fee, Tarrifs etc) that are published by a jurisdiction
 * for general public
 *
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @example
 *
 * const { app } = require('@codetanzania/majifix-content');
 *
 * ...
 *
 * app.start(function(error, info) {
 *	 ...
 * });
 *
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const app = require('@lykmapipo/express-common');


/* declarations */
const pkg = require(path.join(__dirname, 'package.json'));
const fields = [
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
];
const info = _.merge({}, _.pick(pkg, fields));


/* export package(module) info */
exports.info = info;


/*** import models */
const Content =
  require(path.join(__dirname, 'lib', 'content.model'));


/* import routers */
const router =
  require(path.join(__dirname, 'lib', 'http.router'));


/* export content model */
exports.Content = Content;


/* export content router */
exports.router = router;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {

    //TODO bind oauth middlewares authenticate, token, authorize

    /* bind content router */
    app.mount(router);
    return app;
  }

});
