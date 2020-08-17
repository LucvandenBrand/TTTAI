import Grid from "./grid";

export default class Game {
    constructor(grid) {
        this._turn = Grid.MARK_HUMAN;
        this._grid = grid;
    }

    get grid() {
        return this._grid;
    }

    isMyTurn(mark) {
        return this._turn === mark;
    }

    nextTurn() {
        if (this._turn === Grid.MARK_HUMAN)
            this._turn = Grid.MARK_AI;
        else
            this._turn = Grid.MARK_HUMAN;
    }
}