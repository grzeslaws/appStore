import { Immutable } from "immutable-typescript";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { Categories } from "../../../model/Categories";
import store from "../../../redux/store/store";
import { publicRoutes } from "../../../routes/publicRoutes";

interface CategoriesProps {
    categories: Immutable<Categories>;
    getCategories: () => any;
    fetchDataForCategory: ({ categoryId, pageNumber }: { categoryId?: number; pageNumber: number }) => void;
}

export class CategoriesListPublicComponent extends React.Component<CategoriesProps, {}> {
    constructor(props: any) {
        super(props);

        this.state = {};
    }

    public componentWillMount() {
        this.props.getCategories()(store.dispatch);
    }

    public render() {
        const { categories, fetchDataForCategory } = this.props;
        const categoriesList = categories
            ? categories.categories.map(c => (
                  <li key={c.id}>
                      <NavLink
                          onClick={() => fetchDataForCategory({ categoryId: c.id, pageNumber: 1 })}
                          to={publicRoutes.categoryTemplate({ categoryId: c.id })}>
                          {c.name}
                      </NavLink>
                  </li>
              ))
            : null;

        return <>Categories list: {categoriesList}</>;
    }
}
