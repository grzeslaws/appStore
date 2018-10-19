export const publicRoutes = {
    main: "/",
    home: "/collection/:collectionId/page/:pageNumber",
    homeTemplate: ({ collectionId = 1, pageNumber = 1 }: { collectionId?: number; pageNumber?: number }) => `/collection/${collectionId}/page/${pageNumber}`,
    productsTemplate: ({ pageNumber = 1 }) => `/products/page/${pageNumber}`,
    product: `/product/:productUuid`,
    productTemplate: `/product/`,
    category: `/category/:categoryId/page/:pageNumber?`,
    categoryTemplate: ({ categoryId = 1, pageNumber = 1 }: { categoryId: number; pageNumber?: number }) => `/category/${categoryId}/page/${pageNumber}`,
    cart: `/cart`,
    payu: `/payu`,
};
