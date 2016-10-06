var mazeGen = {};

function randomInt(options, max) {
    return Math.floor(options.random() * max);
}
function randomChoice(options, array) {
    return array[randomInt(options, array.length)];
}

var DIRECTIONS = [
    [ 0, -1, 'north', 'south'],
    [ 1,  0, 'east',  'west' ],
    [ 0,  1, 'south', 'north'],
    [-1,  0, 'west',  'east' ],
];

function backtracking(maze, options) {
    var width = maze.width();
    var height = maze.height();
    var visited = [];

    for (var i = 0; i < width * height; i ++) {
        visited.push(false);
    }

    function isVisited(pos) {
        var x = pos[0];
        var y = pos[1];
        if (x < 0 || x >= width || y < 0 || y >= height)
            return true;
        return visited[y * width + x];
    }

    function markVisited(pos) {
        var x = pos[0];
        var y = pos[1];
        visited[y * width + x] = true;
    }

    function getUnvisitedDirections(pos) {
        var ret = [];
        for (var i = 0; i < DIRECTIONS.length; i ++) {
            var dir = DIRECTIONS[i];
            if (!isVisited([pos[0] + dir[0], pos[1] + dir[1]])) {
                ret.push(dir);
            }
        }
        return ret;
    }

    function connect(pos, dir) {
        var x = pos[0];
        var y = pos[1];
        maze.cell(x, y)['_'+dir[2]] = true;
        x += dir[0];
        y += dir[1];
        maze.cell(x, y)['_'+dir[3]] = true;
        return [x, y];
    }

    var cur = [randomInt(options, width), randomInt(options, height)];
    var stack = [];
    markVisited(cur);

    for (;;) {
        var neighbors = getUnvisitedDirections(cur);
        if (neighbors.length) {
            var dir = randomChoice(options, neighbors);
            stack.push(cur);
            cur = connect(cur, dir);
            markVisited(cur);
        } else if (stack.length) {
            cur = stack.pop();
        } else {
            break;
        }
    }
}

mazeGen.generate = function(width, height, options) {
    options = options || {};
    options.random = options.random || Math.random;
    if (width <= 0 || height <= 0)
        throw new Error('invalid size: ' + width + ',' + height);

    var maze = new mazeGen.Maze(width, height);

    backtracking(maze, options);

    return maze;
};

mazeGen.Maze = function(width, height) {
    this._width = width;
    this._height = height;
    this._grid = [];
    for (var i = 0; i < width * height; i ++)
        this._grid.push(new mazeGen.Cell());
};

mazeGen.Maze.prototype.width = function() {
    return this._width;
};

mazeGen.Maze.prototype.height = function() {
    return this._height;
};

mazeGen.Maze.prototype.cell = function(x, y) {
    if (x < 0 || y < 0 || x >= this.width() || y >= this.height())
        throw new Error('cell out of bounds: ' + x + ',' + y);
    return this._grid[y * this.width() + x];
};

mazeGen.Cell = function() {
    this._north = false;
    this._west = false;
    this._south = false;
    this._east = false;
};

mazeGen.Cell.prototype.north = function() {
    return this._north;
};

mazeGen.Cell.prototype.west = function() {
    return this._west;
};

mazeGen.Cell.prototype.south = function() {
    return this._south;
};

mazeGen.Cell.prototype.east = function() {
    return this._east;
};

module.exports = mazeGen;
