import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import {route} from "next/dist/server/router";


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

    return <NewMeetupForm onAddMeetup={addMeetupHandler}/>
}

export default NewMeetupPage;
