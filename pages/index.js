import MEETUPS_DATA from "../meetup.data";
import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";
import {dbConfig} from "../dbconfig";


function HomePage(props) {
    return <MeetupList meetups={props.meetups}/>
}

// Special function, rands before regular function (pre-renders)
export async function getStaticProps() {
    try {
        const client = await MongoClient.connect(dbConfig);
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const meetups = await meetupsCollection.find().toArray();
        await client.close();
    } catch (e) {
        console.log(e);
    }

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.data.title,
                address: meetup.data.address,
                image: meetup.data.image,
                id: meetup._id.toString(),
            })),
            revalidate: 1,
        },
    };

}

export default HomePage;

