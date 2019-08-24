import path from 'path';
import _ from 'lodash';
import { clear, expect } from '@lykmapipo/mongoose-test-helpers';
import { Content } from '../../src';

describe('Content Seed', () => {
  const { SEEDS_PATH, CONTENT_TYPES } = process.env;

  before(done => clear(done));

  before(() => {
    process.env.CONTENT_TYPES = 'Post';
    process.env.SEEDS_PATH = path.join(__dirname, '..', 'fixtures');
  });

  it('should be able to seed', done => {
    Content.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should not throw if seed exist', done => {
    Content.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should seed provided', done => {
    const seed = {
      type: 'Post',
      title: {
        en: 'Facilis sunt ut fuga aspernatur odit autem.',
        sw: 'Molestiae delectus quia.',
      },
      body: {
        en: 'Est qui sit deleniti temporibus quasi sequi voluptates.',
        sw: 'Molestias voluptas atque. Repudiandae doloribus sed rerum rem et.',
      },
    };
    Content.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should seed provided', done => {
    const seed = {
      type: 'Post',
      title: {
        en: 'Facilis sunt ut fuga aspernatur odit autem.',
        sw: 'Molestiae delectus quia.',
      },
      body: {
        en: 'Est qui sit deleniti temporibus quasi sequi voluptates.',
        sw: 'Molestias voluptas atque. Repudiandae doloribus sed rerum rem et.',
      },
    };
    Content.seed([seed], (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should not throw if provided exist', done => {
    const seed = {
      type: 'Post',
      title: {
        en: 'Facilis sunt ut fuga aspernatur odit autem.',
        sw: 'Molestiae delectus quia.',
      },
      body: {
        en: 'Est qui sit deleniti temporibus quasi sequi voluptates.',
        sw: 'Molestias voluptas atque. Repudiandae doloribus sed rerum rem et.',
      },
    };
    Content.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should be able to seed from environment', done => {
    Content.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { type: 'Post' })).to.exist;
      done(error, seeded);
    });
  });

  it('should not throw if seed from environment exist', done => {
    Content.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { type: 'Post' })).to.exist;
      done(error, seeded);
    });
  });

  after(done => clear(done));

  after(() => {
    process.env.CONTENT_TYPES = CONTENT_TYPES;
    process.env.SEEDS_PATH = SEEDS_PATH;
  });
});
