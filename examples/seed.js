const _ = require('lodash');
const { waterfall } = require('async');
const { connect, clear } = require('@lykmapipo/mongoose-common');
const { Jurisdiction } = require('@codetanzania/majifix-jurisdiction');
const { Content } = require('../lib');

/* track seeding time */
let seedStart;
let seedEnd;

/* eslint-disable */
const log = (stage, error, results) => {
  if (error) {
    console.error(`${stage} seed error`, error);
  }

  if (results) {
    const val = _.isArray(results) ? results.length : results;
    console.info(`${stage} seed result`, val);
  }
};
/* eslint-enable */

const clearSeed = next => clear(Content, Jurisdiction, () => next());

const seedJurisdiction = next => Jurisdiction.fake().post(next);

const seedContent = (jurisdiction, next) => {
  let contents = Content.fake(50);

  contents = _.forEach(contents, group => {
    const sample = group;
    sample.jurisdiction = jurisdiction;
    return sample;
  });

  Content.create(contents, next);
};

const seed = () => {
  seedEnd = Date.now();
  waterfall([clearSeed, seedJurisdiction, seedContent], (error, results) => {
    if (error) {
      throw error;
    }
    seedEnd = Date.now();

    log('time', null, seedEnd - seedStart);
    log('final', error, results);
    process.exit(0);
  });
};

// connect and seed
connect(error => {
  if (error) {
    throw error;
  }
  seed();
});
