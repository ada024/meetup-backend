import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from "mongodb";
import {dbConfig} from "../../dbconfig";

function MeetupDetails(props) {
    console.log("The data is", props.meetupData);
    return (
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
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
