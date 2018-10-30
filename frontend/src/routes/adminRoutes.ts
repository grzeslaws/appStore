export const adminRoutes = {
    admin: "/admin/",
    products: `/admin/products/page/:pageNumber?`,
    productsTemplate: ({pageNumber = 1}) => `/admin/products/page/${pageNumber}`,
};
