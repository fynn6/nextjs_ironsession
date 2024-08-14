"use server"

export const login = (formData : FormData) => {
    const loginData = {
        email : formData.get("email"),
        password : formData.get("password"),
    }

    // simuale login
    console.log(loginData);
}