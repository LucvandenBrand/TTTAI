import GridRenderer from './view/gridRenderer'
import Grid from './model/grid';
import GridController from "./controller/gridController";
import Game from "./model/game";
import AI from "./ai/ai";

window.onload = () => {
  const gridElement = document.getElementById('playing-field');
  const grid = new Grid(3, 3);
  const game = new Game(grid);
  const ai = new AI(game);
  const gridRenderer = new GridRenderer(grid, gridElement);
  const gridController = new GridController(game, gridRenderer);
};