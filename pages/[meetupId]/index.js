import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from "mongodb";
import {dbConfig} from "../../dbconfig";
import {Fragment} from "react";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function MeetupDetails(props) {
    return (

        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description}/>
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
    );
}


export async function getStaticPaths() {

    const client = await MongoClient.connect(dbConfig);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    console.log(meetupsCollection);
    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
    await client.close();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}})),
    };
}


export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(dbConfig);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId),});
    await client.close();

    console.log(selectedMeetup)
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.data.title,
                description: selectedMeetup.data.description,
                address: selectedMeetup.data.address,
                image: selectedMeetup.data.image,
            },
        },
    };

}

export default MeetupDetails;
