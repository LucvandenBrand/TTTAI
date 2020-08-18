import Observer from "../observer/observer";
import Grid from "../model/grid";
import Point from "../model/point";

export default class AI extends Observer{
    constructor(game) {
        super();
        this._game = game;
        this._game.subscribe(this);
    }

    update() {
        if (!this._game.isMyTurn(Grid.MARK_AI))
            return;
        setTimeout(() => {
            this._makeMove().then(result => this._game.nextTurn());
        }, 10);
    }

    async _makeMove() {
        const result = this._findBestOption(Grid.MARK_AI, this._game.grid.unmarked);
        const option = result.option;
        if (option.row >= 0 && option.col >= 0) {
            this._game.grid.markCell(option.row, option.col, Grid.MARK_AI);
        }
    }

    _findBestOption(mark, options) {
        const minScore = mark === Grid.MARK_HUMAN ? -1 : 1;
        const score = this._game.evaluate();
        if (options.length === 0 || score === minScore)
            return new Result(new Point(-1, -1), score);

        let bestResult = new Result(new Point(-1, -1), minScore);
        for (let option of options) {
            this._game.grid.markCell(option.row, option.col, mark);
            const result = this._findBestOption(mark ^ 1, this._removeOption(options, option));
            this._game.grid.markCell(option.row, option.col, Grid.MARK_EMPTY);

            if (mark === Grid.MARK_HUMAN && result.score > bestResult.score) {
                bestResult = new Result(option, result.score);
            }
            if (mark === Grid.MARK_AI && result.score < bestResult.score) {
                bestResult = new Result(option, result.score);
            }
        }

        return bestResult;
    }

    _removeOption(options, option) {
        return options.filter(element => element !== option);
    }
}

class Result {
    constructor(option, score) {
        this.option = option;
        this.score = score;
    }
}