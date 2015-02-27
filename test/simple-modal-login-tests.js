/*global describe, beforeEach, it*/
'use strict';
var assert = require('assert');
var simple_modal_login = require('../src/simple_modal_login');

describe('<%= slug %>', function () {
    it('elvis rock!', function () {
        
        assert(simple_modal_login.tellMe() === 'Tell me how to keep you, satisfied!');

    });
});