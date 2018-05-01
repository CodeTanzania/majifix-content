'use strict';

/*** depedencies */
const _ = require('lodash');
const faker = require('faker');

function sample() {
  return {
    group: 'FAQ',
    type: { en: 'FAQ', sw: 'Maswali' },
    title: { en: faker.lorem.sentence(), sw: faker.lorem.sentence() },
    body: { en: faker.lorem.paragraph(), sw: faker.lorem.paragraph() },
    publishedAt: new Date()
  };
}

module.exports = function (size = 10) {
  size = size > 0 ? size : 10;
  return _.times(size, sample);
};