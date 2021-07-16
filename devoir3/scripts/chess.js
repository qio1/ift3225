		
		function Square(props) {
			return (
				<button className = {"square " + props.color}
				onClick = {props.onClick}
				style= {props.style} >
				</button>
			);
		}
		class Piece {
			constructor(player, icon){
			this.player = player;
			this.style = {backgroundImage: "url('"+icon+"')"};
			}
		}
		class Cavalier extends Piece{
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
	class Roi extends Piece{
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
	class Tour extends Piece{
		constructor(player) {
			super(player,(player == "w" ?"https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"));
			this.ascii = player == "w" ? "R-W" : "R-B";
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
			}else{ //les cases en horizontal
				incrementBy = 1;
				pathStart += 1;
			}

			for(let i = pathStart; i < pathEnd; i+=incrementBy){
				path.push(i);
			}
			return path;
		}
  
	}
	class Dame extends Piece{
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
	class Fou extends Piece{
		constructor(player) {
		super(player,(player == "w" ?"https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"));
		this.ascii = player == "w" ? "B-W" : "B-B";
	  }

	  // fonction qui determine le mouvement possible
	  can_move(start, end) {
		var start_row = 8 - Math.floor(start / 8);
		var start_col = (start % 8) + 1;
		var end_row = 8 - Math.floor(end / 8);
		var end_col = (end % 8) + 1;

		var row_diff = end_row - start_row;
		var col_diff = end_col - start_col;

		if (row_diff == col_diff) { //diagonale "/"
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
		if(Math.abs(start - end) % 9 === 0){ // les cases en diagonale "\"
		  incrementBy = 9;
		  pathStart += 9;
		}else{ // les cases en diagonale "/"
		  incrementBy = 7;
		  pathStart += 7;
		}

		for(let i = pathStart; i < pathEnd; i+=incrementBy){
		  path.push(i);
		}
		return path;
	  }
	}

	class Pion extends Piece{
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
	class Board extends React.Component {
		renderSquare(i, couleur) {
			//attribuer le type de pièce, l'icone de pièce et la couleur de la case
			return <Square
				piece = {this.props.squares[i]} 
				style={this.props.squares[i] ? this.props.squares[i].style : null}
				color = {couleur} 
				onClick = {() => this.props.onClick(i)}
				/>
		}

		//Dessiner les cases dans le plateau
		render() {
			const board = [];
			for (let i = 0; i < 8; i++) {
				 const squareRows = [];
				 for (let j = 0; j < 8; j++) {
					const couleur = (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j)) ? "light-square" : "dark-square";
					squareRows.push(this.renderSquare((i * 8) + j, couleur));
					}
				board.push(<div className = "board-row">{squareRows}</div>)
				}

				return (
					<div>
						{board}
					</div>
				);
		}
	}
	//determine si le numero de case est paire
	function isEven(num) {
		return num % 2 == 0
	}

	function initBoard() {
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
	function transformPiece(piece){
		let output =null ;
		switch(piece) {
			case 'Kn-W':
				output = Cavalier("w");
				break;
			case 'Kn-B':
				output = Cavalier("b");
				break;
			case 'K-W':
				output = Roi("w");
				break;
			case 'K-B':
				output = Roi("b");
				break;
			case 'R-W':
				output = Tour("w");
				break;
			case 'R-B':
				output = Tour("b");
				break;
			case 'Q-W':
				output = Dame("w");
				break;
			case 'Q-B':
				output = Dame("b");
				break;
			case 'B-W':
				output = Fou("w");
				break;
			case 'B-B':
				output = Fou("b");
				break;
			case 'P-W':
				output = Pion("w");
				break;
			case 'P-B':
				output = Pion("b");
				break;
			default:
				output = null;
		}return output;
	}
	//code récuperé et modifié de demo 9 http://www-ens.iro.umontreal.ca/~levestev/ift3225/demo9/cv.js
	function donneeJson(){
			const srcUrl = "http://www-ens.iro.umontreal.ca/~levestev/resources/ift3225/tp3/chess.json";
			let newsquares = Array(64).fill(null);
            $.ajax({
                type: 'GET',
                dataType: "json",
                url: srcUrl,
                success: function (data){
					console.log("JavaScript Ajax + JSON", data)
					$('#react-fetch').text(JSON.stringify(data))
					let k = 0;
                    const pieces = data;
					for(let i in pieces){
						for(let j in pieces[i]){
							newsquares[k]= transformPiece(pieces[i][j]);
							k++;
						}
					}
                }
            })
			return newsquares;

	}
	class Game extends React.Component {
		constructor() {
			super();
			this.initState = {
				squares: initBoard(),
				player: "w",
				mated: 0,
				source: -1,
				status: 'Le blanc commence',
				turn: 'blanc'
			}
			this.state = this.initState;
		}
		//mis à jour de plateau avec les données json par un requete ajax
		setJsonState(){
			this.setState({
				squares: donneeJson(),
				player: "w",
				mated: 0,
				source: -1,
				status: 'Requête réçu. Les données sont affichées dans le plateau. Le blanc commence',
				turn: 'blanc'
			})
		;}
		
		handleClick(i) {
			const squares = this.state.squares.slice();

			if (this.state.mated) {
				this.setState({
					source: -1,
					status: "La partie est terminée.",
				});
				return;
			}

			//premier clique de selection
			if (this.state.source === -1) {
				if (!squares[i] || squares[i].player !== this.state.player) {//choisir une case nulle ou une pièce de l'adversaire
					this.setState({status: "C'est le tour de " + (this.state.turn)});
					
				}else {
					//la source devient ce clique de selection
					this.setState({
						status: 'Choisir la destination pour la pièce sélectionnée',
						source: i, 
						squares: squares
					});
				}	
			}else if (this.state.source > -1) {//prochain clique de destination
				delete squares[this.state.source].style.backgroundColor;
				if (squares[i] && squares[i].player === this.state.player) {//choisir une case non null mais occupé par la pièce de sois-même 
					this.setState({
					status: "Cannibalisme",
					source: -1
					});
				}else{

					const squares = this.state.squares.slice();

					const isDestEnemyOccupied = squares[i] ? true : false; //si la case est occupée par l'adversiare

					const isMovePossible = squares[this.state.source].can_move(this.state.source, i, isDestEnemyOccupied); //si le mouvement possible pour la pièce
					
					//les cases entre source et destination en tableau
					const srcToDestPath = squares[this.state.source].getpath(this.state.source, i);
					
					//le mouvement est valide si les cases entre source et destination ne coincide aucune autres pièces
					const isMoveLegal = this.isMoveLegal(srcToDestPath);


					if (isMovePossible && isMoveLegal) {

						if (squares[i] !== null && (squares[i].ascii == "K-W" || squares[i].ascii == "K-B")){
							// si destination est le roi, il va mourir, la partie sera terminée

							squares[i] = squares[this.state.source];
							squares[this.state.source] = null;

							this.setState({
								squares: squares,
								mated: true,
								status: "Le roi est mort. Le gagnant est le " + (this.state.player == "w" ? 'Blanc' : 'Noir'),
							})
							return;
						}

						//Effectuer le mouvement
						squares[i] = squares[this.state.source];
						squares[this.state.source] = null;

						let player = this.state.player === "w" ? "b" : "w"; //changement de joueur
						let turn = this.state.turn === "blanc" ? "noir" : "blanc"; //changement de tour
						this.setState({
							player: player,
							squares: squares,
							turn: turn,
							source: -1,
							status: "C'est le tour de " + turn,
						});
					} else {
						this.setState({
							status: "Mouvement invalide",
							source: -1,
						});
					}
				}
			}

		}

		//fonction qui dertermine s'il n'y a aucune pièce bloque le mouvement
		isMoveLegal(srcToDestPath) {
			let isLegal = true;
			 for (let i = 0; i < srcToDestPath.length; i++) {
				if (this.state.squares[srcToDestPath[i]] !== null) {
					 isLegal = false;
				}
			}
			return isLegal;
		}
		
				
		render() {
			return ( 
			<div className = "container">
			<div className = "row text-center">
				<div className="col-sm-12 p-2 ">
				<h2>Jeu d'échec locale</h2>
					<div className = "game-board p-2">
					 <Board squares = {this.state.squares} onClick = {this.handleClick.bind(this)}/>
					</div>
					<div className = "game-info">
						<div className = "info alert alert-light"> {this.state.status}</div>
					</div>
					<div className = "boutons" >
						<button type = "button" className="btn btn-warning btn-sm" onClick = {this.setJsonState.bind(this)}> Afficher les données json
						</button>
						 <div id="react-fetch"></div>
					</div>
				</div>
			</div>
			</div>
			);
		}
	}
	
	ReactDOM.render(
		<Game/>,document.getElementById('root')
	);