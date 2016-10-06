# maze-generator
A javascript maze generator

This module generates a maze using "recursive backtracking".  Usage:
```
var mazeGen = require('@sbj42/maze-generator');

// generate a 20x20 maze
var maze = mazeGen.generate(20, 20);

// get the north-east corner cell of the maze
var cell = maze.cell(0, 0);
```

# API

`generate(width, height)`

The `generate()` function takes a width and a height, and returns a new maze object.

`maze.width()` / `maze.height()`

Return the width and height of the maze.

`maze.cell(x, y)`

Returns a cell object for the cell at the given position.

`cell.north()` / `cell.east()` / `cell.south()` / `cell.west()`

These boolean properties indicate whether the cell has a passage in each of the cardinal directions.  If the property
is `true`, then there is a passage in that direction.  `false` indicates a wall.
