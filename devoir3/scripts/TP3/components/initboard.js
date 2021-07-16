import Cavalier from '../pieces/cavalier.js';
import Roi from '../pieces/roi.js';
import Tour from '../pieces/tour.js';
import Dame from '../pieces/dame.js';
import Pion from '../pieces/pion.js';
import Fou from '../pieces/fou.js';
export default function initBoard() {
		const squares = Array(64).fill(null);

		// pion noir
		for (let i = 8; i < 16; i++) {
			squares[i] = new Pion("b");
		}

		// pion blanc
		for (let i = 8 * 6; i < 8 * 6 + 8; i++) {
			squares[i] = new Pion("w");
		}
		// cavalier noir
		squares[1] = new Cavalier("b");
		squares[6] = new Cavalier("b");
		// cavalier blanc
		squares[56 + 1] = new Cavalier("w");
		squares[56 + 6] = new Cavalier("w");

		// fou noir
		squares[2] = new Fou("b");
		squares[5] = new Fou("b");
		// fou blanc
		squares[56 + 2] = new Fou("w");
		squares[56 + 5] = new Fou("w");

		// tour noir
		squares[0] = new Tour("b");
		squares[7] = new Tour("b");
	   // tour blanc
		squares[56 + 0] = new Tour("w");
		squares[56 + 7] = new Tour("w");

		// roi et dame noirs
		squares[3] = new Dame("b");
		squares[4] = new Roi("b");

		 // roi et dame blancs
		squares[56 + 3] = new Dame("w");
		squares[56 + 4] = new Roi("w");

		return squares;
	}