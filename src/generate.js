var Maze = require('@sbj42/maze-generator-support').Maze;

function generate(width, height, options) {
    options = options || {};
    options.random = options.random || Math.random;
    options.generator = options.generator || '@sbj42/maze-generator-backtrack';

    var maze = new Maze(width, height);

    var generator;
    try {
        generator = require(options.generator);
    } catch (e) {
        throw new Error('failed to load plugin ' + options.generator + ': ' + e.toString());
    }
    generator(maze, options);

    return maze;
}

module.exports = generate;
