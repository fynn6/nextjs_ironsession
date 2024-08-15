import { SessionOptions } from "iron-session";

export const sessionOptions : SessionOptions = {
    password : process.env.AUTH_SECRET ?? "defaultPasswordIsetBecauseIwantMyAppToBeSecuredBlaBlaBlaBla",
    cookieName: "nextjsironsession",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }
}

export const getClientSession = async () => {
    const sessionResponse : any = await fetch('/api/auth/session', {
        method: "GET"
    }).catch(e => console.error(e));

    if (sessionResponse.status === 200) {
        const session = await sessionResponse.json();
        return session;
    }

    return null;
}