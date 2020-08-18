import Grid from "./grid";
import Observable from "../observer/observable";

/**
 * Top-level class containing the grid and managing basic game logic.
 */
export default class Game extends Observable {
    /**
     * Construct the game with a grid.
     * @param {Grid} grid The grid on which the game is played.
     */
    constructor(grid) {
        super();
        this._turn = Grid.MARK_HUMAN;
        this._grid = grid;
    }

    /**
     * Return the grid used by the game
     * @returns {Grid}
     */
    get grid() {
        return this._grid;
    }

    /**
     * Return true if it is the turn of the given mark.
     * @param {Number} mark The mark to query.
     * @returns {boolean}
     */
    isMyTurn(mark) {
        return this._turn === mark;
    }

    /**
     * Switch to the other player's turn.
     */
    nextTurn() {
        if (this._turn === Grid.MARK_HUMAN)
            this._turn = Grid.MARK_AI;
        else
            this._turn = Grid.MARK_HUMAN;
        this._notifyObservers();
    }

    /**
     * Return a score evaluating the winning-state of the game.
     * @returns {Number}
     */
    evaluate() {
        let score = this._evaluateRows();
        if (score !== 0)
             return score;
        score = this._evaluateCols();
        if (score !== 0)
            return score;

        return this._evaluateDiags();
    }

    _evaluateRows() {
        let score = 0;
        for (let row = 0; row < this._grid.rows; row++) {
            score = this._evaluateRow(row);
            if (score !== 0)
                return score;
        }
        return score;
    }

    _evaluateRow(row) {
        let winHuman = true;
        let winAI    = true;
        for (let col = 0; col < this._grid.cols; col++) {
            let mark = this._grid.getCellMark(row, col);
            winHuman &= (mark === Grid.MARK_HUMAN);
            winAI    &= (mark === Grid.MARK_AI);
        }
        return (winHuman ? 1 : 0) + (winAI ? -1 : 0);
    }

    _evaluateCols() {
        let score = 0;
        for (let col = 0; col < this._grid.cols; col++) {
            score = this._evaluateCol(col);
            if (score !== 0)
                return score;
        }
        return score;
    }

    _evaluateCol(col) {
        let winHuman = true;
        let winAI    = true;
        for (let row = 0; row < this._grid.rows; row++) {
            let mark = this._grid.getCellMark(row, col);
            winHuman &= (mark === Grid.MARK_HUMAN);
            winAI    &= (mark === Grid.MARK_AI);
        }
        return (winHuman ? 1 : 0) + (winAI ? -1 : 0);
    }

    _evaluateDiags() {
        let size = this._grid.rows;
        let leftWinHuman = true, leftWinAI = true;
        let rightWinHuman = true, rightWinAI = true;
        for (let rowCol = 0; rowCol < size; rowCol++) {
            let leftMark = this._grid.getCellMark(rowCol, rowCol);
            leftWinHuman &= (leftMark === Grid.MARK_HUMAN);
            leftWinAI    &= (leftMark === Grid.MARK_AI);

            let rightMark = this._grid.getCellMark(rowCol, size - 1 - rowCol);
            rightWinHuman &= (rightMark === Grid.MARK_HUMAN);
            rightWinAI    &= (rightMark === Grid.MARK_AI);
        }

        let scoreLeftDiag  = (leftWinHuman ? 1 : 0) + (leftWinAI ? -1 : 0) ;
        let scoreRightDiag = (rightWinHuman ? 1 : 0) + (rightWinAI ? -1 : 0) ;

        return scoreLeftDiag + scoreRightDiag;
    }

}