import Observer from "../observer/observer";

export default class GridRenderer extends Observer {
    constructor(grid, gridElement) {
        super();
        this._grid = grid;
        this._gridElement = gridElement;
        this._cellElements = [];
        this._buildView();
        this._renderGrid();
        grid.subscribe(this);
    }

    get cellElements() {
        return this._cellElements;
    }

    _buildView() {
        this._gridElement.innerHTML = '';
        for (let row = 0; row < this._grid.rows; row++) {
            let colElements = [];
            for (let col = 0; col < this._grid.cols; col++) {
                const cell = document.createElement('div');
                const value = this._grid.getCellMark(row, col).toString();
                cell.setAttribute('mark', value);
                colElements.push(cell);
                this._gridElement.appendChild(cell);
            }
            this._cellElements.push(colElements);
        }
    }

    _renderGrid() {
        for (let row = 0; row < this._grid.rows; row++) {
            for (let col = 0; col < this._grid.cols; col++) {
                const cell = this._cellElements[row][col];
                const value = this._grid.getCellMark(row, col).toString();
                cell.setAttribute('mark', value);
            }
        }
    }

    update() {
        this._renderGrid();
    }
}