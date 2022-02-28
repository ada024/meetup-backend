import {dbConfig} from "../../dbconfig";
import {MongoClient} from "mongodb";

// /api/new-meetup
async function handler(req, res) {

    if (req.method === 'POST') {
        const data = req.body;
        try {
            const client = await MongoClient.connect(dbConfig);
            const db = client.db();
            const meetupsCollection = db.collection('meetups');
            const result = await meetupsCollection.insertOne({data})
            console.log(result);
            await client.close();
            res.status(201).json({message: 'Meetup added!'});
        } catch (e) {
            console.log('Some error occurred: ', e);
        }
    }

}

export default handler;
