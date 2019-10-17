const db = require("../_utils/mongo")
const Game = require("../_model/Game")

module.exports = async (req, res) => {

	switch (req.method) {
		case "POST":
			await handlePostGame(res)
			break
		default:
			res.status(404).json({ status: "error", message: req.method+" does nothing." })
	}

}

const handlePostGame = async res => {
	const newGame = new Game()
	const dbWriteResult = await db.insertGame(newGame)
	dbWriteResult.success ? res.status(201).json(dbWriteResult.newGame)
						  : res.status(500).json(dbWriteResult)
}

