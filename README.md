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

var mazeGen = require('@sbj42/maze-generator');

// generate a 20x20 maze
var maze = mazeGen.generate(20, 20, {
    generator: '@sbj42/maze-generator-backtrack'
});

// get the north-east corner cell of the maze
var cell = maze.cell(0, 0);
```

## API

`generate(width, height, options)`

The `generate()` function takes a width and a height, and returns a new maze object.  The (optional) `options` argument
can be used for additional settings:
* `options.random`: (optional) A random number generator, as a function that returns a number between 0 (inclusive) and
1 (exclusive).  The default random number generator is `Math.random`.
* `options.generator`: (optional) A maze-generator plugin, as a package name  The default plugin is
`@sbj42/maze-generator-backtrack` (though you'll need to make sure that's installed to use it).

`maze.width()` / `maze.height()`

Return the width and height of the maze.

`maze.cell(x, y)`

Returns a cell object for the cell at the given position.

`cell.north()` / `cell.east()` / `cell.south()` / `cell.west()`

These boolean properties indicate whether the cell has a passage in each of the cardinal directions.  If the property
is `true`, then there is a passage in that direction.  `false` indicates a wall.

## Demo

For a demonstration, see the package ``@sbj42/maze-generator-demo`.
