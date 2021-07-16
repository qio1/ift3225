export default class Piece {
	constructor(player, icon){
		this.player = player;
		this.style = {backgroundImage: "url('"+icon+"')"};
	}
}