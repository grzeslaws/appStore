export const publicRoutes = {
    main: "/",
    home: "/home",
    products: `/products/page/:pageNumber?`,
    productsTemplate: ({ pageNumber = 1 }) => `/products/page/${pageNumber}`,
    product: `/product/:productUuid`,
    productTemplate: `/product/`,
    category: `/category/:categoryId/page/:pageNumber?`,
    categoryTemplate: ({ categoryId = 1, pageNumber = 1 }: { categoryId: number; pageNumber?: number }) => `/category/${categoryId}/page/${pageNumber}`,
    cart: `/cart`,
};
