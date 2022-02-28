import MEETUPS_DATA from "../meetup.data";
import MeetupList from "../components/meetups/MeetupList";


function HomePage(props) {
    return <MeetupList meetups={props.meetups}/>
}

// Special function, rands before regular function (pre-renders)
export async function getStaticProps() {
    return {
        props: {
            meetups: MEETUPS_DATA
        }
    };
}

export default HomePage;

