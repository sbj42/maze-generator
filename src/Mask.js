function Mask(width, height, options) {
    options = options || {};
    var initialValue = false;
    if (options.initialValue != null)
        initialValue = !!options.initialValue;
    this._width = width;
    this._height = height;
    this._grid = [];
    this._outsideValue = true;
    if (options.outsideValue != null)
        this._outsideValue = !!options.outsideValue;
    for (var i = 0; i < width * height; i ++) {
        this._grid.push(initialValue);
    }
}

Mask.prototype.width = function() {
    return this._width;
};

Mask.prototype.height = function() {
    return this._height;
};

Mask.prototype.get = function(x, y) {
    if (x < 0 || x >= this.width() || y < 0 || y >= this.height()) {
        if (this._outsideValue == null)
            throw new Error('cell out of bounds: ' + x + ',' + y);
        return this._outsideValue;
    }
    return this._grid[y * this.width() + x];
};

Mask.prototype.set = function(x, y, value) {
    this._grid[y * this.width() + x] = value;
    return this;
};

module.exports = Mask;
