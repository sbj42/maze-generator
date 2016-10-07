var dirs = {};

dirs.NORTH = 0;
dirs.EAST =  1;
dirs.SOUTH = 2;
dirs.WEST =  3;

dirs.ALL = [dirs.NORTH, dirs.EAST, dirs.SOUTH, dirs.WEST];

dirs.opposite = function(dir) {
    return [dirs.SOUTH, dirs.WEST, dirs.NORTH, dirs.EAST][dir];
};

dirs.dx = function(dir) {
    return [0, 1, 0, -1][dir];
};

dirs.dy = function(dir) {
    return [-1, 0, 1, 0][dir];
};

dirs.bitmask = function(dir) {
    return 1 << dir;
};

module.exports = dirs;
