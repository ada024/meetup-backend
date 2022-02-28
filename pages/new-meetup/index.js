import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import {route} from "next/dist/server/router";
import Head from "next/head";
import {Fragment} from "react";


function NewMeetupPage() {
    const router = useRouter()

    async function addMeetupHandler(enteredMeetupData) {
        try {
            const response = await fetch('/api/new-meetup', {
                method: 'POST',
                body: JSON.stringify(enteredMeetupData),
                headers: {'Content-Type': 'application/json'}
            });
            const data = await response.json();
            console.log(data);
            await router.push('/'); // replace() to preventing back-btn
        } catch (e) {
            console.log("An connection error occurred", e);
        }

    }

    return (
        <Fragment>
            <Head>
                <title>Add a Meetup</title>
                <meta name='description' content='Add a meetups for networking.'/>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Fragment>
    );
}

export default NewMeetupPage;
