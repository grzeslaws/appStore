import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import { NewProduct } from "../../../model/NewProduct";
import { Products } from "../../../model/Products";
import store from "../../../redux/store/store";
import { AddProductAdminComponent } from "./AddProductAdminComponent";

import { adminRoutes } from "../../../routes/adminRoutes";

import * as _ from "lodash";
import endpoints from "../../../endpoints";
import { Categories } from "../../../model/Categories";
import { Category } from "../../../model/Category";
import { PaginationComponent } from "../../pagination/PaginationComponent";
import { CategoriesAdminComponent } from "../categories/CategoriesAdminComponent";
import "./products-admin.scss";

export interface ProductsProps {
    i18n: Immutable<I18N>;
    products: Immutable<Products>;
    fetchAdminProducts: (i18n: I18N, pageNumber?: number, perPage?: number) => any;
    addProduct: (payload: NewProduct, productImage: FileList, i18n: I18N) => any;
    editProduct: (productUuid: string, payload: NewProduct, i18n: I18N, productImage?: FileList) => any;
    deleteProduct: (productUuid: string, i18n: I18N) => any;
    pageNumber: string;
    categories: Immutable<Categories>;
    getCategories: () => any;
    addCategory: (i18n: I18N, categoryName: string) => any;
    deleteCategory: (i18n: I18N, categoryId: number) => any;
    deleteCategoryFromProduct: (i18n: I18N, categoryId: number, productUuid: string) => any;
    perPage?: string;
}

interface ProductsState {
    productName: string;
    currentProduct: string;
    productImage: FileList;
    productCategory: number;
}
export class ProductsAdminComponent extends React.Component<ProductsProps, ProductsState> {
    constructor(props: ProductsProps) {
        super(props);

        this.state = {
            productName: "",
            currentProduct: null,
            productImage: null,
            productCategory: 1,
        };
    }

    public componentDidMount() {
        const currentPageNumber = this.props.pageNumber ? Number(this.props.pageNumber) : 1;
        this.props.fetchAdminProducts(this.props.i18n, currentPageNumber)(store.dispatch);
        this.props.getCategories()(store.dispatch);
    }

    public render() {
        const { products, i18n, categories, addCategory, deleteCategory } = this.props;
        const paginationData = products
            ? {
                  hasNext: products.hasNext,
                  hasPrev: products.hasNext,
                  nextNum: products.nextNum,
                  prevNum: products.prevNum,
                  pages: products.pages,
              }
            : null;

        const categoriesSelect = (category: ReadonlyArray<Immutable<Category>>) => {
            return categories.categories.map(c => {
                const isCategoryExist = !!category.find(cat => cat.id === c.id);
                if (!isCategoryExist) {
                    return (
                        <option key={c.id} value={c.id}>
                            {" "}
                            {c.name}{" "}
                        </option>
                    );
                }
            });
        };

        const categoriesForProduct = (cat: ReadonlyArray<Immutable<Category>>, productUuid: string) => {
            return cat.map(c => {
                return (
                    <li key={c.id}>
                        {c.name}
                        <button onClick={() => this.removeCategoryFromProduct(c.id, productUuid)}>Remove category</button>
                    </li>
                );
            });
        };

        const showCategoriesSelect = (productCategories: ReadonlyArray<Immutable<Category>>, allCategories: ReadonlyArray<Immutable<Category>>) => {
            console.log(_.intersectionBy(productCategories, allCategories, "id").length);

            return productCategories && allCategories ? _.intersectionBy(productCategories, allCategories, "id").length !== allCategories.length : null;
        };

        const simpleStyle = { border: "1px solid", padding: "10px", marginBottom: "10px" }; // to remove

        const productList: ReadonlyArray<JSX.Element> = products
            ? products.products.map(p => {
                  const isCurrentProduct = this.state.currentProduct === p.productUuid ? true : false;
                  return (
                      <div style={simpleStyle} key={p.id}>
                          {p.name}
                          {p.imagePath && <img style={{ maxWidth: "40px" }} src={`${endpoints.getPathForProductImage(p.imagePath)}`} />}
                          <button onClick={() => this.openEditProduct(p.productUuid, p.name)}>
                              {isCurrentProduct ? i18n.products.closeEditor : i18n.products.openEditor}
                          </button>
                          {isCurrentProduct && (
                              <>
                                  <div>
                                      <div style={simpleStyle}>
                                          <label>{i18n.products.imageName}</label>
                                          <input value={this.state.productName} name="productName" onChange={this.onChange} placeholder={p.name} />
                                          <input type="file" name="productImage" onChange={this.onChange} />
                                      </div>
                                      {showCategoriesSelect(p.categories, categories.categories) && (
                                          <div style={simpleStyle}>
                                              Select category:{" "}
                                              <select name="productCategory" value={this.state.productCategory} onChange={this.onChange}>
                                                  <option key={0} value={0} defaultChecked={true}>
                                                      Select category
                                                  </option>
                                                  {categoriesSelect(p.categories)}
                                              </select>
                                          </div>
                                      )}

                                      <ul style={simpleStyle}>Categories list: {categoriesForProduct(p.categories, p.productUuid)}</ul>
                                      <button onClick={() => this.saveChanges(p.productUuid)}>{i18n.products.saveChanges}</button>
                                      <button onClick={() => this.handleDeleteProduct(p.productUuid)}> X {i18n.products.deleteProduct}</button>
                                  </div>
                              </>
                          )}
                      </div>
                  );
              })
            : null;

        return (
            <>
                <AddProductAdminComponent i18n={i18n} addProduct={this.handleAddProduct} />
                {this.props.i18n.products.title}
                <div style={{ display: "flex" }}>
                    <div>{productList}</div>
                    <CategoriesAdminComponent i18n={i18n} categories={categories} addCategory={addCategory} deleteCategory={deleteCategory} />
                </div>
                <div>
                    {products && (
                        <PaginationComponent
                            i18n={i18n}
                            paginationData={paginationData}
                            fetchDataForCurrentPage={this.fetchDataForCurrentPage}
                            baseRoute={adminRoutes.productsTemplate}
                        />
                    )}
                </div>
            </>
        );
    }

    private fetchDataForCurrentPage = ({ categoryId, pageNumber }: { categoryId?: number; pageNumber: number }) => {
        if (pageNumber !== Number(this.props.pageNumber)) {
            store.dispatch(this.props.fetchAdminProducts(this.props.i18n, pageNumber));
        }
    };

    private handleAddProduct = (payload: NewProduct, productImage: FileList, i18n: I18N) => {
        store.dispatch(this.props.addProduct(payload, productImage, i18n));
    };

    private onChange = (e: React.ChangeEvent<any>) => {
        const newProduct: ProductsState = {
            ...this.state,
        };

        newProduct[e.target.name] = e.target.files ? e.target.files : e.target.value;

        this.setState({
            ...this.state,
            ...newProduct,
        });
    };

    private openEditProduct = (productUuid: string, productName: string) => {
        if (this.state.currentProduct === productUuid) {
            this.setState({ currentProduct: null });
        } else {
            this.setState({ currentProduct: productUuid, productName });
        }
    };

    private saveChanges = (productUuid: string) => {
        if (!this.state.productName && !this.state.productImage) {
            return;
        }

        const payload = new NewProduct(this.state.productName, this.state.productCategory);
        console.log(payload);
        store.dispatch(this.props.editProduct(productUuid, payload, this.props.i18n, this.state.productImage));
        this.setState({ currentProduct: null });
    };

    private removeCategoryFromProduct(categoryId: number, productUuid: string) {
        this.props.deleteCategoryFromProduct(this.props.i18n, categoryId, productUuid)(store.dispatch);
    }

    private handleDeleteProduct(productUuid: string) {
        store.dispatch(this.props.deleteProduct(productUuid, this.props.i18n));
    }
}
