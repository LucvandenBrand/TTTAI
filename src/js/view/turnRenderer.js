import Observer from "../observer/observer";
import Grid from "../model/grid";

export default class TurnRenderer extends Observer {
    constructor(game, turnElement) {
        super();
        this._game = game;
        this._turnElement = turnElement;
        game.subscribe(this);
    }

    update() {
        console.log("turn!");
        if (this._game.isMyTurn(Grid.MARK_AI))
            this._turnElement.style.display = "block";
        else
            this._turnElement.style.display = "none";
    }
}