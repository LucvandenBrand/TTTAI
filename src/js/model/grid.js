import Observable from '../Observer/observable'

export default class Grid extends Observable {
    constructor(rows, cols) {
        super();
        this._rows = rows;
        this._cols = cols;
        this._grid_data = [];
        this._buildGrid();
    }

    _buildGrid() {
        this._grid_data = [];
        for (let row = 0; row < this._rows; row++) {
            let colValues = [];
            for (let col = 0; col < this._cols; col++) {
                colValues.push(this.MARK_EMPTY);
            }
            this._grid_data.push(colValues);
        }
    }

    get MARK_EMPTY() {
        return -1;
    }

    get MARK_HUMAN() {
        return 0;
    }

    get MARK_AI() {
        return 1;
    }

    get cols() {
        return this._cols;
    }

    get rows() {
        return this._rows;
    }

    markCell(row, col, mark) {
        this._checkRange();
        this._grid_data[row][col] = mark;
        this._notifyObservers();
    }

    _checkRange(row, col) {
        if (row < 0 || row >= this._rows)
            throw new RangeError("The row is outside of the grid.");
        if (col < 0 || col >= this._cols)
            throw new RangeError("The column is outside of the grid.");
    }

    getCellMark(row, col) {
        this._checkRange();
        return this._grid_data[row][col];
    }
}