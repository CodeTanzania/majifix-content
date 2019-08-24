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
import { pkg } from '@lykmapipo/common';
import { apiVersion as httpApiVersion } from '@lykmapipo/env';
import { start } from '@lykmapipo/express-common';
import Content from './content.model';
import contentRouter from './content.http.router';

/**
 * @name info
 * @description package information
 * @type {object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
export const info = pkg(
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
 * @name Content
 * @description Content model
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { Content };

/**
 * @name contentRouter
 * @description content http router
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { contentRouter };

/**
 * @name apiVersion
 * @description http router api version
 * @type {string}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export const apiVersion = httpApiVersion();

/**
 * @function start
 * @name start
 * @description start http server
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { start };
