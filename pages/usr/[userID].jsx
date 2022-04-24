import { useRouter } from 'next/router'

function ProfileDetail() {
    const router = useRouter()
    const userID = router.query.userID
    return <h1>Details about user 82877 {userID}</h1>
}

export default ProfileDetail