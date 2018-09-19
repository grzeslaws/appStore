import { config } from "./config/config";

const endpoints = {
    // public
    getAllPublicProducts: (pageNumber = 1, perPage = 5) => `/api/public/get_all_products/${pageNumber}/${perPage}`,
    getPublicProduct: (productUuid: string) => `/api/public/get_product/${productUuid}`,
    getPathForProductImage: (pathToImage: string) => `api/public/get_image/${pathToImage}`,
    addOneProduct: (productUuuid: string) => `/api/public/add_one_product/${productUuuid}`,
    removeOneProduct: (productUuid: string) => `/api/public/remove_one_product/${productUuid}`,
    login: `/api/login`,

    // admin
    products: `/api/admin/products`,
    adminProfile: `/api/admin_profile`,
    getAllAdminProducts: (pageNumber = 1, perPage = 5) => `/api/admin/get_all_products/${pageNumber}/${perPage}`,
    addProductImage: `/api/admin/add_product_image`,
    editProductImage: (productUuid: string) => `/api/admin/edit_product_image/${productUuid}`,
    editProduct: (productUuid: string) => `/api/admin/edit_product/${productUuid}`,
    deleteProduct: (productUuid: string) => `/api/admin/delete_product/${productUuid}`,
};

export default endpoints;
