var process = require('process');

var mazeGen = require('../src/maze-generator');

var width = process.argv.length > 2 ? process.argv[2] : 39;
var height = process.argv.length > 3 ? process.argv[3] : 15;

var m = mazeGen.generate(width, height);

var stdout = process.stdout;
for (var y = 0; y < m.height(); y ++) {
    for (var x = 0; x < m.width(); x ++) {
        stdout.write('+');
        stdout.write(m.cell(x, y).north() ? ' ' : '-');
    }
    stdout.write('+');
    stdout.write('\n');
    for (var x = 0; x < m.width(); x ++) {
        stdout.write(m.cell(x, y).west() ? ' ' : '|');
        stdout.write(' ');
    }
    stdout.write(m.cell(m.width()-1, y).east() ? ' ' : '|')
    stdout.write('\n');
}
for (var x = 0; x < m.width(); x ++) {
    stdout.write('+');
    stdout.write(m.cell(x, m.height()-1).south() ? ' ' : '-');
}
stdout.write('+');
stdout.write('\n');
