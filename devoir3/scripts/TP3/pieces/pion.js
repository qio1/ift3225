import Piece from './piece.js';
export defaultclass Pion extends Piece{
		constructor(player) {
		super(player,(player == "w" ? "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"));
		this.ascii = player == "w" ? "P-W" : "P-B";
		this.posInit = player == "w" ? [48, 49, 50, 51, 52, 53, 54, 55] : [8, 9, 10, 11, 12, 13, 14, 15]
		}

	  // fonction qui determine le mouvement possible
	  can_move(start, end, blocked) {
		var start_row = 8 - Math.floor(start / 8);
		var start_col = (start % 8) + 1;
		var end_row = 8 - Math.floor(end / 8);
		var end_col = (end % 8) + 1;

		var row_diff = end_row - start_row;
		var col_diff = end_col - start_col;

		if (this.player == "w") {// le tour de blanc
		  if (col_diff == 0 && !blocked) {
			if (row_diff == 1) return true; // avancer 1 case
			else if(row_diff == 2 && this.posInit.includes(start))return true; // avancer 2 cases
			
		  }else if ((col_diff == -1 || col_diff == 1)&& blocked) { //manger en diagonale
			if (row_diff == 1) return true;
		  }
		  
		} else {
		  if (col_diff == 0 && !blocked) { //le tour de noir
			if (row_diff == -1 ) return true; // avancer 1 case
			else if(row_diff == -2 && this.posInit.includes(start))return true; // avancer 2 cases
			
		  } else if ((col_diff == -1 || col_diff == 1)&& blocked) { //manger en diagonale
			if (row_diff == -1) return true;
		  }
		}
		return false;
	  }
	  /*fonction qui retourne les cases entre start et end en tableau
		Code modifié de https://www.techighness.com/post/develop-two-player-chess-game-with-react-js/
	  */
	  getpath(start,end){
		  if(end === start - 16){ //avancer 2 case par blanc
			return [start - 8];
		}else if(end === start + 16){ //avancer 2 case par noir
			return [start + 8];
		}
		return []; //avancer ou manger en diagonale en 1 case
	  }
	}