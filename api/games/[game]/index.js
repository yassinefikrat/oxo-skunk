const db = require("../../_utils/mongo")

module.exports = async (req, res) => {

	switch (req.method) {
		case "GET":
			await handleGetGame(req.query, res)
			break
		default:
			res.status(404).json({ status: "error", message: req.method+" does nothing." })
	}

}

const handleGetGame = async (query, res) => {

	if (query.game) {
		const dbReadResult = await db.findGameById(query.game)
		dbReadResult.success 	? res.status(200).json(dbReadResult.game)
						  		: res.status(500).json(dbReadResult)
	} else 
		res.status(400).json({ error: true, message: "Missing game id path parameter." })
		
}

