# maze-generator
A javascript maze generator

This library can be used to generate mazes using various algorithms.

Installation:

```
npm install --save-dev @sbj42/maze-generator
```

Don't forget to also choose a maze algorithm and install the plugin for that:

```
npm install --save-dev @sbj42/maze-generator-backtrack
```

Usage:

```
var mazeGen = require('@sbj42/maze-generator');

// generate a 20x20 maze
var maze = mazeGen.generate(20, 20, {
    generator: '@sbj42/maze-generator-backtrack'
});

// get the north-east corner cell of the maze
var cell = maze.cell(0, 0);
```

## API

`mazeGen.generate(width, height, options)`

The `generate()` function takes a width and a height, and returns a new maze object.  The (optional) `options` argument
can be used for additional settings:
* `options.random`: (optional) A random number generator, as a function that returns a number between 0 (inclusive) and
1 (exclusive).  The default random number generator is `Math.random`.
* `options.generator`: (optional) A maze-generator plugin, as a package name  The default plugin is
`@sbj42/maze-generator-backtrack` (though you'll need to make sure that's installed to use it).
* `options.mask`: (optional) A `GridMask`, indicating the cells the maze can use.  Any cell marked `false` in the mask
will not be used in the maze.  Some maze algorithms may not support this option.  The mask should be a single connected
region, if it isn't then the resulting maze may only fill one region.  For information about the `GridMask` API,
see the `@sbj42/maze-generator-core` package.

`maze.width()` / `maze.height()`

Return the width and height of the maze.

`maze.cell(x, y)`

Returns a cell object for the cell at the given position.

`cell.north()` / `cell.east()` / `cell.south()` / `cell.west()`

These boolean properties indicate whether the cell has a passage in each of the cardinal directions.  If the property
is `true`, then there is a passage in that direction.  `false` indicates a wall.

`mazeGen.GridMask(width, height, options)`

For information about the `GridMask` API, see the `@sbj42/maze-generator-core` package.

## Generator algorithms

Multiple generator algorithms can be used, each with different characteristics.  Here are some examples, with some
information about each, as measured generating a bunch of 100x100 mazes: 

| Algorithm                       | Relative Speed | Dead Ends | Branches | Avg. Dead End Length | Avg. Straight Run Length |
| ------------------------------- | --------------:| ---------:| --------:| --------------------:| ------------------------:|
| @sbj42/maze-generator-backtrack |           100% |     10.0% |     9.9% |                  2.1 |                      1.7 |
| @sbj42/maze-generator-prim      |            58% |     35.6% |    29.4% |                  1.6 |                      2.1 |
| @sbj42/maze-generator-kruskal   |            50% |     30.6% |    26.5% |                  1.7 |                      1.9 |