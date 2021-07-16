import React from 'react';
import '../style.css';
import Board from './board.js';
import initBoard from './initboard.js';
//code inspiré et modifié de https://www.techighness.com/post/develop-two-player-chess-game-with-react-js/
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
