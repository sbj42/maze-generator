var assert = require('assert');
var randomjs = require('random-js');

var mazeGen = require('../src/maze-generator');

function makeRandom(seed) {
    var engine = randomjs.engines.mt19937().seed(seed);
    var real = randomjs.real(0, 1);
    return function() {
        return real(engine);
    };
}

describe('maze-generator', function() {

    describe('#generate()', function() {

        it('should throw for an invalid size', function() {
            assert.throws(function() { mazeGen.generate(0, 10); });
            assert.throws(function() { mazeGen.generate(10, 0); });
        });

        it('should return a maze of the given size', function() {
            var m1 = mazeGen.generate(20, 20, {
                random: makeRandom(1)
            });
            assert.ok(m1 instanceof mazeGen.Maze, 'not a Maze object')
            assert.equal(20, m1.width());
            assert.equal(20, m1.height());

            var m2 = mazeGen.generate(3, 17, {
                random: makeRandom(2)
            });
            assert.ok(m2 instanceof mazeGen.Maze, 'not a Maze object')
            assert.equal(3, m2.width());
            assert.equal(17, m2.height());
        });

        it('can make a very thin maze', function() {
            assert.ok(mazeGen.generate(1, 100) instanceof mazeGen.Maze);
            assert.ok(mazeGen.generate(100, 1) instanceof mazeGen.Maze);
        });

        it('should return the same maze when seeded', function() {
            var m1 = mazeGen.generate(7, 11, {
                random: makeRandom(3)
            });
            var m2 = mazeGen.generate(7, 11, {
                random: makeRandom(3)
            });
            for (var y = 0; y < m1.height(); y ++) {
                for (var x = 0; x < m1.width(); x ++) {
                    var c1 = m1.cell(x, y);
                    var c2 = m2.cell(x, y);
                    assert.equal(c1.north(), c2.north(), 'north mismatch at ' + x + ',' + y);
                    assert.equal(c1.east(), c2.east(), 'east mismatch at ' + x + ',' + y);
                    assert.equal(c1.south(), c2.south(), 'south mismatch at ' + x + ',' + y);
                    assert.equal(c1.west(), c2.west(), 'west mismatch at ' + x + ',' + y);
                }
            }
        });
    }); // #generate()

    describe('Maze', function() {

        describe('#cell()', function() {

            it('should return a cell for valid coordinates', function() {
                var m1 = mazeGen.generate(12, 16, {
                    random: makeRandom(4)
                });
                for (var y = 0; y < m1.height(); y ++) {
                    for (var x = 0; x < m1.width(); x ++) {
                        assert.ok(m1.cell(x, y) instanceof mazeGen.Cell, 'not a Cell object');
                    }
                }
            });

            it('should throw for invalid coordinates', function() {
                var m1 = mazeGen.generate(18, 4, {
                    random: makeRandom(5)
                });
                assert.throws(function() { m1.cell(-1, -1); });
                assert.throws(function() { m1.cell(18, 4); });
                assert.throws(function() { m1.cell(-1, 2); });
                assert.throws(function() { m1.cell(10, -1); });
                assert.throws(function() { m1.cell(18, 2); });
                assert.throws(function() { m1.cell(10, 4); });
            });

        }); // #cell()

        it('should have no cells without passages', function() {
            var m1 = mazeGen.generate(11, 15, {
                random: makeRandom(6)
            });
            for (var y = 0; y < m1.height(); y ++) {
                for (var x = 0; x < m1.width(); x ++) {
                    var cell = m1.cell(x, y);
                    assert.ok(cell.north() || cell.east() || cell.south() || cell.west(), 'no passage at ' + x + ',' + y);
                }
            }
        });

        it('should have at least one dead end', function() {
            var m1 = mazeGen.generate(15, 11, {
                random: makeRandom(7)
            });
            for (var y = 0; y < m1.height(); y ++) {
                for (var x = 0; x < m1.width(); x ++) {
                    var cell = m1.cell(x, y);
                    var count = (cell.north() ? 1 : 0) + (cell.east() ? 1 : 0) + (cell.south() ? 1 : 0) + (cell.west() ? 1 : 0);
                    if (count == 1)
                        return;
                }
            }
            assert.fail('no dead ends');
        });

        it('should have cells with passages that match', function() {
            var m1 = mazeGen.generate(16, 18, {
                random: makeRandom(8)
            });
            for (var y = 0; y < m1.height(); y ++) {
                for (var x = 0; x < m1.width(); x ++) {
                    var cell = m1.cell(x, y);
                    if (x == 0) {
                        assert.ok(!cell.west(), 'a cell on the west edge should not have a west passage');
                    } else {
                        assert.equal(cell.west(), m1.cell(x-1, y).east(), 'west mismatch from ' + x + ',' + y);
                    }
                    if (x == m1.width() - 1) {
                        assert.ok(!cell.east(), 'a cell on the east edge should not have a east passage');
                    } else {
                        assert.equal(cell.east(), m1.cell(x+1, y).west(), 'east mismatch from ' + x + ',' + y);
                    }
                    if (y == 0) {
                        assert.ok(!cell.north(), 'a cell on the north edge should not have a north passage');
                    } else {
                        assert.equal(cell.north(), m1.cell(x, y-1).south(), 'north mismatch from ' + x + ',' + y);
                    }
                    if (y == m1.height() - 1) {
                        assert.ok(!cell.south(), 'a cell on the south edge should not have a south passage');
                    } else {
                        assert.equal(cell.south(), m1.cell(x, y+1).north(), 'south mismatch from ' + x + ',' + y);
                    }
                }
            }
        });

    }); // Maze

}); // maze-generator
