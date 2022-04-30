
import axios from "axios";

export default function ProfileDetail({ user }) {

    return (<>
        <h1>Details about user  {user.id}</h1>
        <h1>Details about user {user.name}</h1>
    </>);

}

export const getServerSideProps = async ({ params }) => {

    const res = await axios.get(`http://localhost:80/api/user/${params.userID}`);
    return {
        props: {
            user: res.data
        },
    };
};