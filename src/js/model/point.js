/**
 * Contains a position in a grid.
 */
export default class Point {
    /**
     * Construct a point at row, col.
     * @param {Number} row The vertical location.
     * @param {Number} col The horizontal location.
     */
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}