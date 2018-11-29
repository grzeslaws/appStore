export const publicRoutes = {
    main: "/",
    public: "/public",
    home: "/public/collection/:collectionId/page/:pageNumber",
    homeTemplate: ({ collectionId = 1, pageNumber = 1 }: { collectionId?: number; pageNumber?: number }) =>
        `/public/collection/${collectionId}/page/${pageNumber}`,
    productsTemplate: ({ pageNumber = 1 }) => `/public/products/page/${pageNumber}`,
    product: `/public/product/:productUuid`,
    productTemplate: `/public/product/`,
    category: `/public/category/:categoryId/page/:pageNumber?`,
    categoryTemplate: ({ categoryId = 1, pageNumber = 1 }: { categoryId: number; pageNumber?: number }) => `/public/category/${categoryId}/page/${pageNumber}`,
    cart: `/public/cart`,
    payu: `/public/payu`,
    thankYouPage: `/public/thankYouPage`,
    login: "/login",
};
