import { connect, clear, drop } from '@lykmapipo/mongoose-test-helpers';

process.env.DEFAULT_LOCALE = 'en';
process.env.LOCALES = 'en,sw';
process.env.DEFAULT_CONTENT_TYPE = 'Post';
process.env.CONTENT_TYPES = 'Post,Tarrif';

/* setup database */
before(done => connect(done));

/* clear database */
before(done => clear(done));

/* drop database */
after(done => drop(done));
