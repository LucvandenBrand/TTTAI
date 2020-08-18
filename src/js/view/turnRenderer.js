import Observer from "../observer/observer";
import Grid from "../model/grid";

/**
 * Makes the 'robot-thinking' div visible whenever the turn
 * is for the AI.
 */
export default class TurnRenderer extends Observer {
    /**
     * Construct the TurnRenderer, making it subscribe to the game.
     * @param {Game} game The game to observe.
     * @param {HTMLElement} turnElement The div to hide/show.
     */
    constructor(game, turnElement) {
        super();
        this._game = game;
        this._turnElement = turnElement;
        game.subscribe(this);
    }

    /**
     * Show the 'robot-thinking' div if the turn is for the AI.
     */
    update() {
        console.log("turn!");
        if (this._game.isMyTurn(Grid.MARK_AI))
            this._turnElement.style.display = "block";
        else
            this._turnElement.style.display = "none";
    }
}