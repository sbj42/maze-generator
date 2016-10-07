var Maze = require('../Maze');

var generators = {
    'backtracking': require('./backtracking/backtracking')
};

function generate(width, height, options) {
    options = options || {};
    options.random = options.random || Math.random;
    options.generator = options.generator || 'backtracking';
    if (width <= 0 || height <= 0)
        throw new Error('invalid size: ' + width + ',' + height);

    var maze = new Maze(width, height);

    var generator = generators[options.generator];
    if (!generator)
        throw new Error('unexpected generator: ' + options.generator);
    generator(maze, options);

    return maze;
}

module.exports = generate;
