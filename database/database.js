import MongoClient from 'mongodb'
import mongodb from 'mongodb'

export async function makeDb () {
    const dbName = process.env.db_name
    const url = process.env.db_url
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, function(err, client) {
            if(!err) {
                const db = client.db(dbName)
                db.makeId = makeIdFromString
                resolve(db)
            }
            reject(null);
        });
    })
}

function makeIdFromString (id) {
    return new mongodb.ObjectID(id)
}