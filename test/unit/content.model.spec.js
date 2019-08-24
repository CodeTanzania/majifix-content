import { expect } from '@lykmapipo/mongoose-test-helpers';
import Content from '../../src/content.model';

describe('Content', () => {
  describe('Statics', () => {
    it('should expose model name as constant', () => {
      expect(Content.MODEL_NAME).to.exist;
      expect(Content.MODEL_NAME).to.be.equal('Content');
    });
  });
});
