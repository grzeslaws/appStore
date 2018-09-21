import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import { Categories } from "../../../model/Categories";
import store from "../../../redux/store/store";

interface CategoriesAdminProps {
    i18n: Immutable<I18N>;
    categories: Immutable<Categories>;
    addCategory: (i18n: I18N, categoryName: string) => any;
    deleteCategory: (i18n: I18N, categoryId: number) => any;
}

interface CategoriesAdminState {
    categoryItem: string;
}

export class CategoriesAdminComponent extends React.Component<CategoriesAdminProps, CategoriesAdminState> {
    constructor(props: CategoriesAdminProps) {
        super(props);

        this.state = {
            categoryItem: "",
        };
    }

    public render() {
        const { categories, deleteCategory, i18n } = this.props;
        const categoriesList = categories
            ? categories.categories.map(c => (
                  <li key={c.id}>
                      {c.name}
                      <button onClick={() => deleteCategory(i18n, c.id)(store.dispatch)}>Remove category</button>
                  </li>
              ))
            : null;
        const addCategoryForm = (
            <div>
                <label>Add category </label>
                <input value={this.state.categoryItem} onChange={this.setCategoryItem} />
                <button onClick={this.addCategory}>Add</button>
            </div>
        );

        return (
            <>
                Categories list: <ul>{categoriesList}</ul>
                {addCategoryForm}
            </>
        );
    }

    private setCategoryItem = e => {
        this.setState({
            categoryItem: e.target.value,
        });
    };

    private addCategory = () => {
        this.props.addCategory(this.props.i18n, this.state.categoryItem)(store.dispatch);
        this.setState({ categoryItem: "" });
    };
}
