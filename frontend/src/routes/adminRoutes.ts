export const adminRoutes = {
    admin: "/admin/",
    orders: "/admin/orders",
    orderTemplate: (orderUuid: string) => `/admin/order/${orderUuid}`,
    order: `/admin/order/:orderUuid`,
    products: `/admin/products/page/:pageNumber?`,
    productsTemplate: ({pageNumber = 1}) => `/admin/products/page/${pageNumber}`,
};
