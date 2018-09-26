import { config } from "./config/config";

const endpoints = {
    // public
    getAllPublicProducts: ({ categoryId = 0, pageNumber = 1, perPage = 5 }) => `/api/public/get_all_products/${categoryId}/${pageNumber}/${perPage}`,
    getPublicProduct: (productUuid: string) => `/api/public/get_product/${productUuid}`,
    getPathForProductImage: (pathToImage: string) => `api/public/get_image/${pathToImage}`,
    addOneProduct: (productUuuid: string) => `/api/public/add_one_product/${productUuuid}`,
    removeOneProduct: (productUuid: string) => `/api/public/remove_one_product/${productUuid}`,
    getCategories: `/api/public/get_categories`,
    getCollections: `/api/public/get_collections`,
    login: `/api/login`,

    // admin
    products: `/api/admin/products`,
    adminProfile: `/api/admin/profile`,
    getAllAdminProducts: (pageNumber = 1, perPage = 5) => `/api/admin/get_all_products/${pageNumber}/${perPage}`,
    addProductImage: `/api/admin/add_product_image`,
    editProductImage: (productUuid: string) => `/api/admin/edit_product_image/${productUuid}`,
    editProduct: (productUuid: string) => `/api/admin/edit_product/${productUuid}`,
    deleteProduct: (productUuid: string) => `/api/admin/delete_product/${productUuid}`,
    addCategory: `/api/admin/add_category`,
    deleteCategory: (categoryId: number) => `/api/admin/delete_category/${categoryId}`,
    deleteCategoryFromProduct: (categoryId: number, productUuid: string) => `/api/admin/delete_category_for_product/${categoryId}/${productUuid}`,
    addCollection: `/api/admin/add_collection`,
    deleteCollectionFromProduct: (collectionId: number, productUuid: string) => `/api/admin/delete_collection_for_product/${collectionId}/${productUuid}`,
};

export default endpoints;