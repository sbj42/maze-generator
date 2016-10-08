var describe = require('mocha').describe;
var it = require('mocha').it;
var assert = require('assert');

var mazeGen = require('../src');

describe('maze-generator', function() {

    it('should throw for an invalid generator plugin', function() {
        assert.throws(function() { mazeGen.generate(20, 20, {generator: 'pizza-fish'}); });
    });

    it('should call the provided generator plugin', function() {
        var options = {generator: '../test-plugin'};
        var maze = mazeGen.generate(20, 20, options);
        assert.ok(maze._test_options === options, 'didn\'t call the plugin');
    });

}); // maze-generator
