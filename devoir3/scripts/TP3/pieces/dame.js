import Piece from './piece.js';
export default class Dame extends Piece{
		constructor(player) {
			super(player,(player == "w" ? "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"));
			this.ascii = player == "w" ? "Q-W" : "Q-B";
		}

		// fonction qui determine le mouvement possible
		can_move(start, end) {
			var start_row = 8 - Math.floor(start / 8);
			var start_col = (start % 8) + 1;
			var end_row = 8 - Math.floor(end / 8);
			var end_col = (end % 8) + 1;

			var row_diff = end_row - start_row;
			var col_diff = end_col - start_col;

			if (row_diff > 0 && col_diff == 0) { //vers la droite
				return true;
			} else if (row_diff < 0 && col_diff == 0) { // vers le gauche
				return true;
			} else if (row_diff == 0 && col_diff > 0) { // vers le haut
				return true;
			}  else if (row_diff == 0 && col_diff < 0) { // vers le bas
				return true;
			}else if (row_diff == col_diff) { //diagonale "/"
				return true;
			} else if (row_diff == -col_diff) { //diagonale "\" 
				return true;
			}
			return false;
		}
		/*fonction qui retourne les cases entre start et end en tableau
		Code modifié de https://www.techighness.com/post/develop-two-player-chess-game-with-react-js/
		*/
		getpath(start,end){
			let path = [], pathStart, pathEnd, incrementBy;
			if(start > end){
				pathStart = end;
				pathEnd = start;
			}else{
				pathStart = start;
				pathEnd = end;
			}
			if(Math.abs(start - end) % 8 === 0){ //les cases en vertical
				incrementBy = 8;
				pathStart += 8;
			}else if(Math.abs(start - end) % 9 === 0){ // les cases en diagonale
				incrementBy = 9;
				pathStart += 9;
			}else if(Math.abs(start - end) % 7 === 0){ // les cases en diagonale
				incrementBy = 7;
				pathStart += 7;
			}else{ // les cases en horizontal
				incrementBy = 1;
				pathStart += 1;
			}

			for(let i = pathStart; i < pathEnd; i+=incrementBy){
				path.push(i);
			}
			return path;
		}
	}