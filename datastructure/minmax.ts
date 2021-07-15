<html>
  <head>
    <style>
      body {
        background-color: #1d2126;
        color: white;
      }
      .game {
        display: flex;
        flex-direction: row;
      }

      .board {
        position: relative;
      }

      .winner-container {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ffffff73;
        top: -3px;
      }

      .winner-label {
        width: 100%;
        background: #7fbbc1;
        height: 3em;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: sans-serif;
      }

      .row {
        display: flex;
      }

      .square {
        font-family: "Comic Sans MS", cursive, sans-serif;
        border: 1px solid #999;
        margin-right: -1px;
        text-align: center;
        margin-top: -4px;
        cursor: pointer;
        font-size: 3em;
        height: 2em;
        padding: 0;
        width: 2em;
      }

      .square_winner {
        background: #7fbbc1;
      }

      .reset {
        position: absolute;
      }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.2.0/umd/react-dom.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script type="text/jsx">
    class Game extends React.Component {
      
      
      arr =[...arr]
      let [a,v] = arr
      
      state = {
        boards: Array.from(Array(9).keys()),
        winningCombinations: [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [6, 4, 2]
        ],
        winningCombination: [],
        stepNumber: 0,
        winner: ""
      };

      reset = () => {
        this.setState({
          boards: Array.from(Array(9).keys()),
          stepNumber: 0,
          winningCombination: [],
          winner: ""
        });
      };

      declareWinner = (player) => {
        if (player === "tie") {
          this.setState({ winner: "It's a tie!" });
        } else if (player === "O") {
          this.setState({ winner: "You won!" });
        } else if (player === "X") {
          this.setState({ winner: "You lost" });
        };
      };

      renderWinner = () => {
        const { winner } = this.state;

        return winner ? (
          <div className="winner-container">
            <label className="winner-label">
              {winner}
            </label>
          </div>
        ) : null;
      }

      /*
       * Upon game completion, this method declares the 
       * winning player and combination in the state 
       */
      gameOver = ({ index, player }) => {
        this.setState({
          winningCombination: this.state.winningCombinations[index]
        });
        this.declareWinner(player);
      };

      
      // square renders number or shape 
      renderSquare = index => {
        const { boards, winningCombination } = this.state;
        const value = typeof boards[index] === "number" ?  "":boards[index];
        //const value = boards[index]
        const winMove = winningCombination.includes(index);
        return (
          <button 
            key={index}
            onClick={() => this.handleClick(index)}
            className={`square${winMove ? " square_winner" : ""}`}
          >
            {value}
          </button>
        );
      }

      /*
       * Upon button click this method handles the move of the
       * player if there's not a tie it follows up with the AI move
       */
      handleClick = (index) => {
        if (typeof this.state.boards[index] === "number") {
          if (this.state.winner === "") {
            const boards = this.state.boards;
            const newIndex = this.state.stepNumber + 1;
            boards[index] = "O";

            this.setState({
              boards: boards,
              stepNumber: newIndex
            });

            let gameWon = this.checkWin(boards, "O");
            if (gameWon) {
              this.gameOver(gameWon);
              return
            }
          }
          if (!this.tied) {
            if (this.state.winner === "") {
              const boards = this.state.boards;
              const newIndex = this.state.stepNumber + 1;
              boards[this.bestSpot] = "X";

              this.setState({
                boards: boards,
                stepNumber: newIndex
              });

              let gameWon = this.checkWin(boards, "X");
              if (gameWon) {
                this.gameOver(gameWon);
                return
              }
            }
          }
        }
      }

      /*
       * Determines wether the player has won in the
       * given board
       */
      checkWin = (board, player) => {
        var gameWon = null;
        var newBoard = []
        board.map((element, index) => {
          if (element === player) {
            newBoard.push(index);
          };
        });

        this.state.winningCombinations.map((win, index) => {
          for(var i = 0 , len = win.length; i < len; i++) {
            if (newBoard.indexOf(win[i]) === -1) return false;
          }
          gameWon = {index: index, player: player};
          return;
        })

        return gameWon;
      }

      /*
       * Using the minimax algorithm logic determines
       * what's the best possible move for the given
       * player in the given board
       */
      minimax = (board, player) => {
        let result, bestScore, availSpots = this.emptySquares;

        if (this.checkWin(board, "O")) {
          return {score: -10};
        } else if (this.checkWin(board, "X")) {
          return {score: 10};
        } else if (availSpots.length === 0) {
          return {score: 0};
        }
        var moves = [];
        for (var i = 0; i < availSpots.length; i++) {
          var move = {};
          move.index = board[availSpots[i]];
          board[availSpots[i]] = player;

          if (player === "X") {
            result = this.minimax(board, "O");
            move.score = result.score;
          } else {
            result = this.minimax(board, "X");
            move.score = result.score;
          }

          board[availSpots[i]] = move.index;

          moves.push(move);
        }
        
        
        var bestMove;
        if(player === "X") {
          console.log(moves)
          bestScore = -10000;
          for(var u = 0; u < moves.length; u++) {
            if (moves[u].score > bestScore) {
              bestScore = moves[u].score;
              bestMove = u;
            }
          }
        } else {
          bestScore = 10000;
          for(var o = 0; o < moves.length; o++) {
            if (moves[o].score < bestScore) {
              bestScore = moves[o].score;
              bestMove = o;
            }
          }
        }

        return moves[bestMove];
      };

      get emptySquares() {
        return this.state.boards.filter((square) => typeof square === "number");
      };

      get bestSpot() {
        return this.minimax(this.state.boards, "X").index;
      };

      get tied() {
        if (this.emptySquares.length === 0) {
          this.declareWinner("tie");
          return true;
        }
        return false;
      };

      render() {
        
        let {name} = this.props
        
        return (
          <div className="game">
            <div className="board">
              {this.renderWinner()}
              <div className="row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
              </div>
              <div className="row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
              </div>
              <div className="row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
              </div>
              <button onClick={this.reset} className="reset">reset</button>
            </div>
          </div>
        );
      }
    };

    ReactDOM.render(
      <Game />,
      document.getElementById('root')
    );

  </script>
</html>
