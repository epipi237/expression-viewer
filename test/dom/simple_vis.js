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

// this is your global div instance (see index.html)
var yourDiv = document.getElementById('mocha');

// requires your main app (specified in index.js)
var viewer = require('../..');

describe('nextprot-expression-viewer module', function(){
  describe('#init()', function(){
    it('should fill the textBox', function(){
      var opts = {el: yourDiv, text: 'biojs'};
      var instance = new viewer(opts);
      assert.equal(yourDiv.textContent,"hello biojs");
    });
  });
});
