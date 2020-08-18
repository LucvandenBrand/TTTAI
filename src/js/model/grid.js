import Observable from '../observer/observable'
import Point from "./point";

/**
 * Represents a grid of values, which can be marked.
 */
export default class Grid extends Observable {
    /**
     * Construct a new grid of dimensions rows x cols
     * @param {Number} rows The number of rows.
     * @param {Number} cols The number of columns.
     */
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

    /**
     * Returns the value representing an empty grid cell.
     * @returns {number} mark
     */
    static get MARK_EMPTY() {
        return -1;
    }

    /**
     * Returns the value representing a human-made mark.
     * @returns {number} mark
     */
    static get MARK_HUMAN() {
        return 0;
    }

    /**
     * Returns the value representing an AI-made mark.
     * @returns {number} mark
     */
    static get MARK_AI() {
        return 1;
    }

    /**
     * Returns the number of columns.
     * @returns {Number} columns
     */
    get cols() {
        return this._cols;
    }

    /**
     * Returns the number of rows.
     * @returns {Number} rows
     */
    get rows() {
        return this._rows;
    }

    /**
     * Mark a cell at [row, col] with the given mark.
     * @param {Number} row The row.
     * @param {Number} col The column.
     * @param {Number} mark The mark to place.
     */
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

    /**
     * Return the mark stored at [row, col]
     * @param {Number} row The row.
     * @param {Number} col The column.
     * @returns {Number} mark
     */
    getCellMark(row, col) {
        this._checkRange();
        return this._grid_data[row][col];
    }

    /**
     * Returns false if the location has no human or AI mark.
     * @param {Number} row The row.
     * @param {Number} col The column.
     * @returns {boolean}
     */
    isMarked(row, col) {
        return this.getCellMark(row, col) !== Grid.MARK_EMPTY;
    }

    /**
     * Returns all points at which there is no human or AI mark.
     * @returns {Point[]}
     */
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