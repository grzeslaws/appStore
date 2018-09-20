import { Immutable } from "immutable-typescript";
import * as React from "react";
import { Categories } from "../../../model/Categories";
import store from "../../../redux/store/store";

interface CategoriesAdminProps {
    categories: Immutable<Categories>;
    addCategory: (categoryName: string) => any;
    deleteCategory: (categoryId: number) => any;
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
        const { categories, deleteCategory } = this.props;
        const categoriesList = categories
            ? categories.categories.map(c => (
                  <li key={c.id}>
                      {c.name}
                      <button onClick={() => deleteCategory(c.id)(store.dispatch)}>Remove category</button>
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
        this.props.addCategory(this.state.categoryItem)(store.dispatch);
        this.setState({ categoryItem: "" });
    };
}
