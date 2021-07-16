import Piece from './piece.js';
export default class Cavalier extends Piece{
			constructor(player) {
			super(player,(player == "w" ?"https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"));
			this.ascii = player == "w" ? "Kn-W" : "Kn-B";
		}

		// fonction qui determine le mouvement possible
		can_move(start, end) {
			var start_row = 8 - Math.floor(start / 8);
			var start_col = (start % 8) + 1;
			var end_row = 8 - Math.floor(end / 8);
			var end_col = (end % 8) + 1;

			var row_diff = end_row - start_row;
			var col_diff = end_col - start_col;

			if (row_diff == 1 && col_diff == -2) {
				return true;
			} else if (row_diff == 1 && col_diff == 2) {
				return true;
			} else if (row_diff == -1 && col_diff == -2) {
				return true;
			} else if (row_diff == -1 && col_diff == 2) {
				return true;
			} else if (row_diff == -2 && col_diff == -1) {
				return true;
			} else if (row_diff == -2 && col_diff == 1) {
				return true;
			} else if (row_diff == 2 && col_diff == -1) {
				return true;
			} else if (row_diff == 2 && col_diff == 1) {
				return true;
			} 
			return false;
		}
		/*fonction qui retourne les cases entre start et end en tableau
		Cavalier retourne nul car il saute par dessus les autres pieces
		Code modifié de https://www.techighness.com/post/develop-two-player-chess-game-with-react-js/
		*/
		getpath(start,end){
			return [];
		}
	}