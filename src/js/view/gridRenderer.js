import Observer from "../observer/observer";

/**
 * Renders the given grid in the DOM. Relies on appropriate CSS to render correctly.
 */
export default class GridRenderer extends Observer {
    /**
     * Construct the renderer, which will subscribe to the grid and will build the DOM elements.
     * @param {Grid} grid The grid to render.
     * @param {HTMLElement} gridElement The element to add child elements to.
     */
    constructor(grid, gridElement) {
        super();
        this._grid = grid;
        this._gridElement = gridElement;
        this._cellElements = [];
        this._buildView();
        this._renderGrid();
        grid.subscribe(this);
    }

    /**
     * Returns the cell elements of the rendered grid.
     * @returns {HTMLElement[]} The cell elements of the rendered grid.
     */
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

    /**
     * When the grid changes, we update our DOM render.
     */
    update() {
        this._renderGrid();
    }
}