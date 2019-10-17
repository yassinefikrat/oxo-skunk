const db = require("../../_utils/mongo")

module.exports = async (req, res) => {

	switch (req.method) {
		case "POST":
			await handlePostMove(req.query, req.body, res)
			break
		default:
			res.status(404).json({ status: "error", message: req.method+" does nothing." })
	}

}

const handlePostMove = async (query, body, res) => {

	if (query.game) {
		const dbUpdateResult = await db.findGameAndUpdate(query.game, body)
		dbUpdateResult.success 	? res.status(200).json(dbUpdateResult.game)
						  		: res.status(500).json(dbUpdateResult)
	} else 
		res.status(400).json({ error: true, message: "Missing game id path parameter." })

}

