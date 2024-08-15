"use server"

import { sessionOptions } from "@/lib/auth"
import { getIronSession, IronSession } from "iron-session"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
import { redirect, RedirectType } from "next/navigation"
import authenticate from "@/services/auth"
import { revalidatePath } from "next/cache"

export const getSession = async () => {
    const session : any = await getIronSession(cookies(), sessionOptions);

    if (!session.authenticated) session.authenticated = false;

    return session
}

export const login = async (formData : FormData) => {
    const payload = {
        email : formData.get("email"),
        password : formData.get("password"),
    }

    // simulate login
    const user = await authenticate(payload);
    if (!user) return {error: "Unauthorized"};

    const session = await getSession();

    session.user = user;
    session.authenticated = true;
    session.save();

    revalidatePath("/");
    redirect("/")
}

export const logout = async () => {
	try {
		const session = await getSession();
		session.destroy();
	} catch (error) {
		console.error(error);
	}
    const redirectType : RedirectType = RedirectType.replace;
    redirect("/", redirectType);
}