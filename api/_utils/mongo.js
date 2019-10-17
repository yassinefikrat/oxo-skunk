// Import Dependencies
const url = require('url')
const assert = require('assert')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

// Create cached connection variable
let cachedDb = null


async function findGameById(id) {
    const db = await connectToDatabase(process.env.MONGODB_URI)
    const collection = await db.collection('games')

    try {
        const games = await collection.find({ _id: ObjectID(id) }).toArray()
        assert(games.length == 1)
        return { success: true, game: games[0] }
    } catch (err) {
        console.log(err.stack)
        return { error: true, message: "DB error while retrieving game." }
    }
}

async function findGameAndUpdate(id, newState) {
    const db = await connectToDatabase(process.env.MONGODB_URI)
    const collection = await db.collection('games')

    try {
        const result = await collection.findOneAndUpdate(
            { _id: ObjectID(id) },                    // search query
            { $set: { state: newState } },            // update
            { returnOriginal: false, upsert: true }   // options
        )
        assert(result.value)    // check that we receive the updated game
        return { success: true, game: result.value }
    } catch (err) {
        console.log(err.stack)
        return { error: true, message: "DB error while updating game." }
    }
}

async function insertGame(game) {
    const db = await connectToDatabase(process.env.MONGODB_URI)
    const collection = await db.collection('games')

    try {
        let result = await collection.insertOne(game)
        assert.equal(1, result.insertedCount)
        return { success: true, newGame: result.ops[0] }
    } catch (err) {
        console.log(err.stack)
        return { error: true, message: "DB error when writing new game." }
    }
}


// A function for connecting to MongoDB,
// taking a single paramater of the connection string
async function connectToDatabase(uri) {
    // If the database connection is cached,
    // use it instead of creating a new connection
    if (cachedDb) {
        return cachedDb
    }

    // If no connection is cached, create a new one
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    // Select the database through the connection,
    // using the database path of the connection string
    const db = await client.db(url.parse(uri).pathname.substr(1))

    // Cache the database connection and return the connection
    cachedDb = db
    return db
}

module.exports = {
    findGameById,
    findGameAndUpdate,
	insertGame,
}