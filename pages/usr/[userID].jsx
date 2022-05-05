
import axios from "axios";

export default function ProfileDetail({ user, profile }) {

    return (<>
        <h1>Details about user  {profile.id}</h1>
        <h1>Details about user {profile.name}</h1>
    </>);

}

export const getServerSideProps = async ({ params }) => {
    
    const res = await axios.get(`http://localhost:80/api/user/${params.userID}`);
    
    return {
        props: {
            profile: res.data
        },
    };
};