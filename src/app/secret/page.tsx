import { getSession } from "@/actions/auth"

export const SecretPage = async () => {
    // server side session
    const session = await getSession();

    return (
        <>
            <p>Very secret information</p>
            <p>User: {session?.user?.username}</p>
        </>
    )
}

export default SecretPage;