export default class GridController {
    constructor(grid, gridRenderer) {
        this._grid = grid;
        this._buildClickListeners(gridRenderer.cellElements);
    }

    _buildClickListeners(cellElements) {
        for (let row = 0; row < this._grid.rows; row++) {
            for (let col = 0; col < this._grid.cols; col++) {
                let cell = cellElements[row][col];
                cell.onclick = () => {
                    if (this._grid.isMarked(row, col))
                        return;
                    this._grid.markCell(row, col, this._grid.MARK_HUMAN);
                };
            }
        }
    }
}