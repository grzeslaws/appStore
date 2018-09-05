export const routes = {
    auth: "/auth",
    products: "/products",
    login: "/login",
    trip: (userId: string, tripId: string) => `/auth/users/${userId}/trips/${tripId}`,
    tripTemplate: "/auth/users/:userId/trips/:tripId",
    userViewTemplate: "/auth/users/:userId",
    user: (userId: string) => `/auth/users/${userId}`,
};
