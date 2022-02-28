import Head from 'next/head';
import MEETUPS_DATA from "../meetup.data";
import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";
import {dbConfig} from "../dbconfig";
import {Fragment} from "react";


function HomePage(props) {
    return (<Fragment>
        <Head>
            <title>Meetups app</title>
            <meta name='description' content='Show a list of meetups to choose from nearby'/>
        </Head>
        <MeetupList meetups={props.meetups}/>
    </Fragment>)
}

export async function getStaticProps() {

    const client = await MongoClient.connect(dbConfig);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    await client.close();


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

