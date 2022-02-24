import MEETUPS_DATA from "../meetup.data";
import MeetupList from "../components/meetups/MeetupList";


function HomePage() {
  return <MeetupList meetups={MEETUPS_DATA} />
}

export default HomePage;

