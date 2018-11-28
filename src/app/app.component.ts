import { Component, OnInit } from '@angular/core';
import { DictionaryService } from './dictionary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    DictionaryService
  ]
})

export class AppComponent implements OnInit {
  game: any;
  squares: any[][] = [];
  moveStarted: Boolean;
  startSquare: any;
  endSquare: any;

  constructor(private _dictService: DictionaryService) {}

  ngOnInit() {
//    this.initializeGame();
  }

  renderBoard () {
    let piece = '';
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const squareId = this.squares[row][col].id;
        if (this.game.board[row][col]) {
          piece = this.game.board[row][col].color + this.game.board[row][col].type;
        } else {
          piece = 'empty';
        }
        const boardSquare = document.getElementById(squareId);
        boardSquare.classList.remove('br', 'bn', 'bb', 'bq', 'bk', 'bp',
                                    'wr', 'wn', 'wb', 'wq', 'wk', 'wp',
                                    'selected', 'unselected');
        boardSquare.classList.add(piece);
        boardSquare.classList.remove('selected');
        boardSquare.classList.add('unselected');
      }
    }
  }

  initializeGame() {
    this.game = new Object();
    this._dictService.startGame(this.game).subscribe(game => {
      this.game = game;
      for (let row = 0; row < 8; row++) {
        this.squares[row] = [];
        for (let col = 0; col < 8; col++) {
          const squareObject = new Object();
          squareObject['id'] = String.fromCharCode(col + 97) + String(8 - row);
          squareObject['selected'] = false;
          this.squares[row][col] = squareObject;
        }
      }
      this.renderBoard();
      this.moveStarted = false;
    });
  }

  onClick(squareId: string) {
    const col = squareId.charCodeAt(0) - 97;
    const num = Number(squareId.substr(1, 1));
    const row = Number(8 - num);
    const square = document.getElementById(squareId);
    if (this.squares[row][col].selected) {
      square.classList.remove('selected');
      square.classList.add('unselected');
      this.squares[row][col].selected = false;
    } else {
      square.classList.remove('unselected');
      square.classList.add('selected');
      this.squares[row][col].selected = true;
    }
    this.moveStarted = !this.moveStarted;
    if (this.moveStarted) {
      this.startSquare = squareId;
    } else {
      this.endSquare = squareId;
      this.executeMove();
    }
  }

  executeMove() {
    const move = new Object();
    move['from'] = this.startSquare;
    move['to'] = this.endSquare;
    this._dictService.executeMove(this.game._id, move).subscribe(game => {
      this.game = game;
      this.renderBoard();
    });
  }

  flipBoard() {
/*    let piece = '';
    let inverseCol = 0;
    let inverseRow = 0;
    for (let col = 0; col < 8; col++) {
      inverseCol = col + (7 - (2 * col));
      for (let row = 0; row < 4; row++) {
        inverseRow = row + (7 - (2 * row));
        piece = this.spaces[col][row].piece;
        this.spaces[col][row].piece = this.spaces[inverseCol][inverseRow].piece;
        this.spaces[inverseCol][inverseRow].piece = piece;
      }
    }
*/
    this.renderBoard();
  }

  onControlClick(buttonName: String) {
    switch (buttonName) {
      case 'reset':
        this.initializeGame();
        break;
      case 'flip':
        this.flipBoard();
        break;
    }
  }
}
