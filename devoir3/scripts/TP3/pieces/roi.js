import Piece from './piece.js';
export default class Roi extends Piece{
		constructor(player) {
			super(player,(player == "w" ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"));
			this.ascii = player == "w" ? "K-W" : "K-B";
		}

		// fonction qui determine le mouvement possible
		can_move(start, end) {
			var start_row = 8 - Math.floor(start / 8);
			var start_col = (start % 8) + 1;
			var end_row = 8 - Math.floor(end / 8);
			var end_col = (end % 8) + 1;

			var row_diff = end_row - start_row;
			var col_diff = end_col - start_col;

			if (row_diff == 1 && col_diff == -1) { //case en haut à gauche
				return true;
			} else if (row_diff == 1 && col_diff == 0) { //case en haut au milieu
				return true;
			} else if (row_diff == 1 && col_diff == 1) { //case en haut à droite
				return true;
			} else if (row_diff == 0 && col_diff == -1) { //case à gauche
				return true;
			} else if (row_diff == 0 && col_diff == 1) { //case à droit
				return true;
			} else if (row_diff == -1 && col_diff == -1) { //case en bas à gauche
				return true;
			}  else if (row_diff == -1 && col_diff == 0) { //case en bas au milieu
				return true;
			} else if (row_diff == -1 && col_diff == 1) { //case en bas à droite
				return true;
			} 
			return false;
		}
		/*fonction qui retourne les cases entre start et end en tableau
		Le roi retourne nul car il fait seulement un pas
		Code modifié de https://www.techighness.com/post/develop-two-player-chess-game-with-react-js/
		*/
		getpath(start,end){
			return [];
		}
	}