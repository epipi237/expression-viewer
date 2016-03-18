/*
 * nextprot-expression-viewer
 * https://github.com/gastonnche/nextprot-expression-viewer
 *
 * Copyright (c) 2015 shizle
 * Licensed under the Apache-2.0 license.
 */

// chai is an assertion library
var chai = require('chai');

// @see http://chaijs.com/api/assert/
var assert = chai.assert;

// register alternative styles
// @see http://chaijs.com/api/bdd/
chai.expect();
chai.should();

// requires your main app (specified in index.js)
var viewer = require('../..');


describe('nextprot-expression-viewer module', function(){
  describe('#hello()', function(){
    it('should return a hello', function(){

      assert.equal(viewer.hello('biojs'), ("hello biojs"));
      
      // alternative styles
      viewer.hello('biojs').should.equal("hello biojs");
    });
  });
});
