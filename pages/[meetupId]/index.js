import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
    return (
        <MeetupDetail
            image='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg'
            title='First Meetup'
            address='Some Street 29, Some City'
            description='This is our first meetup this year'
        />
    );
}

//react function. If fallback is set to false & the params not listed wil display 404page
export async function getStaticPaths() {
    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: 'm1'
                }
            },
            {
                params: {
                    meetupId: 'm2'
                },
            },
        ],
    }
}

// get for a single meetup. Function is regenerated during build (the console.log is not displayed for the client(browser), only on serve)
// The function is executed foreach request
export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    console.log(meetupId);
    return {
        props: {
            meetupData: {
                id: meetupId,
                title: 'First Meetup',
                address: 'Some Street 29, Some City',
                description: 'This is our first meetup this year',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg'
            }
        }
    }

}

export default MeetupDetails;
