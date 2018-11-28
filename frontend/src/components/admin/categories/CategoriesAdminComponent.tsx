import { Immutable } from "immutable-typescript";
import * as React from "react";
import { I18N } from "../../../i18n/i18n";
import { Categories } from "../../../model/Categories";
import store from "../../../redux/store/store";
import { H3 } from "../../../theme/admin/elements/Headings";
import { Button } from "../../../theme/admin/objects/Buttons";
import { Input } from "../../../theme/admin/objects/Forms";
import { Row } from "../../../theme/admin/objects/Layouts";
import { PostTypeItem, PostTypeRemove, PostTypeText, WrapperPostType } from "../products/productsStyled";

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
                  <PostTypeItem key={c.id}>
                      <PostTypeText>{c.name}</PostTypeText>
                      <PostTypeRemove onClick={() => deleteCategory(i18n, c.id)(store.dispatch)}>remove</PostTypeRemove>
                  </PostTypeItem>
              ))
            : null;

        const addCategoryForm = (
            <>
                <Input value={this.state.categoryItem} onChange={this.setCategoryItem} placeholder="Category name" />
                <Button onClick={this.addCategory}>Add new category</Button>
            </>
        );

        return (
            <Row>
                <H3>Categories list</H3>
                <WrapperPostType>{categoriesList}</WrapperPostType>
                {addCategoryForm}
            </Row>
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
