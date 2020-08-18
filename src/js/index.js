import GridRenderer from './view/gridRenderer'
import Grid from './model/grid';
import GridController from "./controller/gridController";
import Game from "./model/game";
import AI from "./ai/ai";
import TurnRenderer from "./view/turnRenderer";

/**
 * Main entrypoint, load all top-level classes and link them together.
 */
window.onload = () => {

  const grid = new Grid(3, 3);
  const game = new Game(grid);
  const ai = new AI(game);

  const turnElement = document.getElementById('robot-thinking');
  const turnRenderer = new TurnRenderer(game, turnElement);

  const gridElement = document.getElementById('playing-field');
  const gridRenderer = new GridRenderer(grid, gridElement);

  const gridController = new GridController(game, gridRenderer);
};