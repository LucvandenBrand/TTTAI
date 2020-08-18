# TTTAI
Very simple Tic-Tac-Toe AI, written as an example [for a short blog entry of mine](https://lucvandenbrand.com/tutorial/algorithms/2018/06/16/Butter-Cheese-DFS.html).

The actual AI is stored in `src/js/ai/ai.js`. It is not very special, just basic depth-first-search.
It can be much more efficient, you could just make the AI greedy and choose easy-wins and prevent easy-losses.
Still, it works and proves a silly point.

## Development
I make use of Webpack and Babel to transpile to browser-compatible JS.
There are three simple commands that are useful during development.

- `npm dev`: Build a debugging build in `dist`.
- `npm build`: Build a production build in `dist`.
- `npm start`: Build a debugging build and run it locally, it rebuilds when files change.

## Licence
Just plain 'old MIT.