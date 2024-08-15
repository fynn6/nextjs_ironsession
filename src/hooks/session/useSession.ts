import useSWR from "swr";

const sessionApiRoute = "/api/auth/session";

async function fetchJson(input: string, init: any) {
    return fetch(input, {
        headers: {
            accept: "application/json",
            "content-type": "application/json",
        },
        ...init,
    }).then((res) => res.json());
}

export default function useSession() {
    const { data: session, isLoading } = useSWR(
        sessionApiRoute,
        fetchJson,
        {
            fallbackData: null,
        },
    );

  
    return { session };
}