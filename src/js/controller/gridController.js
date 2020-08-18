import Grid from "../model/grid";

/**
 * Allows the user to make moves in the game.
 */
export default class GridController {
    /**
     * Construct the controller, with the game to control
     * and the renderer to bind events to.
     * @param {Game} game The game to control.
     * @param {GridRenderer} gridRenderer The renderer to bind events to.
     */
    constructor(game, gridRenderer) {
        this._game = game;
        this._buildClickListeners(gridRenderer.cellElements);
    }

    _buildClickListeners(cellElements) {
        const grid = this._game.grid;
        for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.cols; col++) {
                let cell = cellElements[row][col];
                cell.onclick = () => {
                    if (!this._game.isMyTurn(Grid.MARK_HUMAN) || grid.isMarked(row, col))
                        return;
                    grid.markCell(row, col, Grid.MARK_HUMAN);
                    this._game.nextTurn();
                };
            }
        }
    }
}