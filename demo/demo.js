var process = require('process');

var mazeGen = require('../src');

var width = process.argv.length > 2 ? process.argv[2] : 39;
var height = process.argv.length > 3 ? process.argv[3] : 30;

var m = mazeGen.generate(width, height);

var stdout = process.stdout;
var x, y;
for (x = 0; x < m.width(); x ++) {
    stdout.write('__');
}
stdout.write('_');
stdout.write('\n');
for (y = 0; y < m.height(); y ++) {
    for (x = 0; x < m.width(); x ++) {
        stdout.write(m.cell(x, y).west() ? '_' : '|');
        stdout.write(m.cell(x, y).south() ? ' ' : '_');
    }
    stdout.write(m.cell(m.width()-1, y).east() ? ' ' : '|');
    stdout.write('\n');
}
