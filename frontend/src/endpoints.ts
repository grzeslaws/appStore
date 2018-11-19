// import { config } from "./config/config";

const endpoints = {
    // public
    getAllPublicProducts: ({ categoryId = 1, pageNumber = 1, perPage = 5 }) => `/api/public/get_all_products/${categoryId}/${pageNumber}/${perPage}`,
    getPublicProduct: (productUuid: string) => `/api/public/get_product/${productUuid}`,
    getProductsByCollection: ({ collectionId = 1, pageNumber = 1, perPage = 5 }) =>
        `/api/public/get_products_by_collection/${collectionId}/${pageNumber}/${perPage}`,
    getPathForProductImage: (pathToImage: string, productUuid: string, imageSize: string) => `api/public/get_image/${pathToImage}/${productUuid}/${imageSize}`,
    addOneProduct: (productUuuid: string) => `/api/public/add_one_product/${productUuuid}`,
    removeOneProduct: (productUuid: string) => `/api/public/remove_one_product/${productUuid}`,
    getCategories: `/api/public/get_categories`,
    getCollections: `/api/public/get_collections`,
    getProductsForCarousel: () => ``,
    createOrder: `/api/public/create_order`,
    getOrder: (orderUuid: string) => `/api/public/get_order/${orderUuid}`,
    getAccessToken: (orderUuid: string) => `/api/public/get_access_token/${orderUuid}`,
    login: `/api/login`,
    getPostPaymentTypes: "/api/public/get_post_payment_types",

    // admin
    products: `/api/admin/products`,
    adminProfile: `/api/admin/profile`,
    getAllAdminProducts: (pageNumber = 1, perPage = 5) => `/api/admin/get_all_products/${pageNumber}/${perPage}`,
    editProductImage: (productUuid: string) => `/api/admin/edit_product_image/${productUuid}`,
    editProduct: (productUuid: string) => `/api/admin/edit_product/${productUuid}`,
    deleteProduct: (productUuid: string) => `/api/admin/delete_product/${productUuid}`,
    addCategory: `/api/admin/add_category`,
    deleteCategory: (categoryId: number) => `/api/admin/delete_category/${categoryId}`,
    deleteCategoryFromProduct: (categoryId: number, productUuid: string) => `/api/admin/delete_category_for_product/${categoryId}/${productUuid}`,
    addCollection: `/api/admin/add_collection`,
    deleteCollectionFromProduct: (collectionId: number, productUuid: string) => `/api/admin/delete_collection_for_product/${collectionId}/${productUuid}`,
    addPostType: "/api/admin/add_post_type",
    deletePostType: (id: number) => `/api/admin/delete_post_type/${id}`,
    addPaymentType: "/api/admin/add_payment_type",
    deletePaymentType: (id: number) => `/api/admin/delete_payment_type/${id}`,
    getOrders: (pageNumber: number, orderBy) => `/api/admin/get_orders/${pageNumber}/${orderBy}`,
    searchOrders: (query: string, pageNumber: number) => `/api/admin/search_orders/${pageNumber}/${query}`,
};

export default endpoints;
