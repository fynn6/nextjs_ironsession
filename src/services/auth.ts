export default async function authenticate(credentials : any) {
    const authenticationPromise = await fetch("https://api.hapis.dev/api/v1.0/authorization", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(credentials),
    });

    if (authenticationPromise.status === 200) {
        return await authenticationPromise.json();
    }

    return false;
}