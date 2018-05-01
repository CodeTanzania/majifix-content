'use strict';


/**
 * @module majifix-content
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
 * const {app} = require('@lykmapipo/majifix-content');
 *
 * ...
 * 
 * app.start(function(error, info) {
 *	 ...
 * });
 * 
 */


/*** dependencies */
const path = require('path');
const app = require('@lykmapipo/express-common');


/*** import models */
const Content =
  require(path.join(__dirname, 'lib', 'content.model'));


/**import routers*/
const router =
  require(path.join(__dirname, 'lib', 'http.router'));


/*** export content model */
exports.model = Content;
exports.Content = Content;


/*** export content router */
exports.router = router;


/*** export app */
Object.defineProperty(exports, 'app', {
  get() {

    //TODO bind oauth middlewares authenticate, token, authorize

    /*** bind content router */
    app.mount(router);
    return app;
  }

});