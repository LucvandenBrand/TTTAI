import GridRenderer from './view/gridRenderer'
import Grid from './model/grid';

window.onload = () => {
  const gridElement = document.getElementById('playing-field');
  const grid = new Grid(3, 3);
  const gridRenderer = new GridRenderer(grid, gridElement);
};