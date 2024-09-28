import { openApiRequest } from "@/utils/api";

export default {
    async login(context, payload) {
        try {
            const response = await openApiRequest("/open-api/user/login", "POST", {
                email: payload.email,
                password: payload.password,
            });

            const responseData = response.data;
            setUser(context, responseData);

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to login";
            console.log(error.response?.data);
            throw new Error(errorMessage);
        }
    },

    async register(context, payload) {
        try {
            const response = await openApiRequest("/open-api/user", "POST", {
                name: payload.name,
                email: payload.email,
                password: payload.password,
            });

            const responseData = response.data;
            setUser(context, responseData);

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to register";
            console.log(error.response?.data);
            throw new Error(errorMessage);
        }
    },

    async logout(context) {
        context.commit('setUser', {
            accessToken: null,
            refreshToken: null,
            username: null,
        });
        await context.dispatch('setIsLoggedIn', false);
    },
};

function setUser(context, responseData) {
    console.log(responseData);
    const responseBodyData = responseData.body;

    context.commit('setUser', {
        accessToken: responseBodyData.accessToken,
        refreshToken: responseBodyData.refreshToken,
        username: responseBodyData.username,
    });
}