class Game {

	constructor() {
		this.state = [
			Game.squareStates.EMPTY, Game.squareStates.EMPTY, Game.squareStates.EMPTY,
			Game.squareStates.EMPTY, Game.squareStates.EMPTY, Game.squareStates.EMPTY,
			Game.squareStates.EMPTY, Game.squareStates.EMPTY, Game.squareStates.EMPTY,
		]
	}

}

// Enum of possible square states
Game.squareStates = {
	EMPTY: ".",
	NAUGHT: "o",
	CROSS: "x",
}

module.exports = Game