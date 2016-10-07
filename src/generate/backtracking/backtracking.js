var Mask = require('../../Mask');
var dirs = require('../../directions');

function randomInt(options, max) {
    return Math.floor(options.random() * max);
}
function randomChoice(options, array) {
    return array[randomInt(options, array.length)];
}

function backtracking(maze, options) {
    var width = maze.width();
    var height = maze.height();
    var visited = new Mask(width, height, false, true);

    function getUnvisitedDirections(pos) {
        var ret = [];
        for (var i = 0; i < dirs.ALL.length; i ++) {
            var dir = dirs.ALL[i];
            if (!visited.get(pos[0] + dirs.dx(dir), pos[1] + dirs.dy(dir)))
                ret.push(dir);
        }
        return ret;
    }

    var cur = [randomInt(options, width), randomInt(options, height)];
    var stack = [];
    visited.set(cur[0], cur[1], true);

    for (;;) {
        var neighbors = getUnvisitedDirections(cur);
        if (neighbors.length) {
            var dir = randomChoice(options, neighbors);
            stack.push(cur);
            maze.setPassage(cur[0], cur[1], dir, true);
            cur = [cur[0] + dirs.dx(dir), cur[1] + dirs.dy(dir)];
            visited.set(cur[0], cur[1], true);
        } else if (stack.length)
            cur = stack.pop();
        else
            break;
    }
}

module.exports = backtracking;
