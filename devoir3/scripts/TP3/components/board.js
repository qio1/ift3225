import React from 'react';
import '../style.css';
import Square from './square.js';
//code inspiré et modifié de https://www.techighness.com/post/develop-two-player-chess-game-with-react-js/
export default class Board extends React.Component {
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
