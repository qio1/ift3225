import React from 'react';
import '../style.css';
/*
Inspirer de tutoriel tictactoe de React https://fr.reactjs.org/tutorial/tutorial.html#passing-data-through-props
*/

export default function Square(props) {
			return (
				<button className = {"square " + props.color}
				onClick = {props.onClick}
				style= {props.style} >
				</button>
			);
		}