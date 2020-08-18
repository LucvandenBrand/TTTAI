import Observable from '../observer/observable'
import Point from "./point";

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
                colValues.push(Grid.MARK_EMPTY);
            }
            this._grid_data.push(colValues);
        }
    }

    static get MARK_EMPTY() {
        return -1;
    }

    static get MARK_HUMAN() {
        return 0;
    }

    static get MARK_AI() {
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

    isMarked(row, col) {
        return this.getCellMark(row, col) !== Grid.MARK_EMPTY;
    }

    get unmarked() {
        let points = [];
        for (let row = 0; row < this._rows; row++) {
            for (let col = 0; col < this._cols; col++) {
                if (!this.isMarked(row, col))
                    points.push(new Point(row, col));
            }
        }
        return points;
    }
}