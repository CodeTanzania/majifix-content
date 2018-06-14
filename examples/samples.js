'use strict';

/* dependencies */
const _ = require('lodash');
const faker = require('@benmaruchu/faker');

/* declarations */
const groups = ['FAQ', 'Post'];


function sample() {
  const group = groups[faker.random.number({ min: 0, max: 1 })];
  return {
    group: group,
    type: { en: group, sw: group },
    title: { en: faker.lorem.sentence(), sw: faker.lorem.sentence() },
    body: { en: faker.lorem.paragraph(), sw: faker.lorem.paragraph() },
    publishedAt: new Date(),
    extras: {
      image: faker.internet.avatar()
    }
  };
}

module.exports = function (size = 10) {
  size = size > 0 ? size : 10;
  return _.times(size, sample);
};
