import { config } from "./config/config";

const endpoints = {
    products: `/api/products`,
    addProductImage: `/api/add_product_image`,
    editProductImage: (productUuid: string) => `/api/edit_product_image/${productUuid}`,
    editProduct: (productUuid: string) => `/api/edit_product/${productUuid}`,
    getPathForProductImage: (pathToImage: string) => `api/get_image/${pathToImage}`,

    logout: `/api/tenants/${config.tenant}/logout`,
    profile: `/api/tenants/${config.tenant}/admin/profile`,
    trip: (userId: string, tripId: string) => `/api/tenants/${config.tenant}/admin/users/${userId}/trips/${tripId}`,
    trips: (userId: string) => `/api/tenants/${config.tenant}/admin/users/${userId}/trips`,
    userData: (userId: string) => `/api/tenants/${config.tenant}/admin/users/${userId}`,
    users: (query?: string) => (query ? `/api/tenants/${config.tenant}/admin/users?q=${query}` : `/api/tenants/${config.tenant}/admin/users`),
    tenantStats: `/api/tenants/${config.tenant}/admin/stats`,
    uploadUsers: "/api/users",
};

export default endpoints;
