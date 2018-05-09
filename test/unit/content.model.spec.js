'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');


/* declarations */
const Content =
  require(path.join(__dirname, '..', '..', 'lib', 'content.model'));


describe('Content', function () {

  describe('Statics', function () {

    it('should expose model name as constant', function () {
      expect(Content.MODEL_NAME).to.exist;
      expect(Content.MODEL_NAME).to.be.equal('Content');
    });

  });


});