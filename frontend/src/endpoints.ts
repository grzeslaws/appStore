import { config } from "./config/config";

const endpoints = {
    products: `/api/products`, // check
    adminProfile: `/api/admin_profile`,
    login: `/api/login`,
    getAllProducts: (pageNumber = 1, perPage = 5) => `/api/get_all_products/${pageNumber}/${perPage}`,
    addProductImage: `/api/add_product_image`,
    editProductImage: (productUuid: string) => `/api/edit_product_image/${productUuid}`,
    editProduct: (productUuid: string) => `/api/edit_product/${productUuid}`,
    getPathForProductImage: (pathToImage: string) => `api/get_image/${pathToImage}`,
    deleteProduct: (productUuid: string) => `/api/delete_product/${productUuid}`,

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
