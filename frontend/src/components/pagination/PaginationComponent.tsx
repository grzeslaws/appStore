import { Immutable } from "immutable-typescript";
import { I18N } from "../../i18n/i18n";

import * as React from "react";
import { LinkItem, Wrapper } from "./PaginationStyled";

export interface PaginationData {
    hasNext: boolean;
    hasPrev: boolean;
    nextNum: number;
    prevNum: number;
    pages: number;
}

interface PaginationProps {
    i18n: Immutable<I18N>;
    paginationData: Immutable<PaginationData>;
    baseRoute: ({ itemId, pageNumber }: { itemId: number; pageNumber: number }) => any;
    itemId: number;
}

export const PaginationComponent: React.SFC<PaginationProps> = props => {
    const { paginationData, i18n, baseRoute, itemId } = props;

    if (!paginationData) {
        return null;
    }

    const { hasNext, hasPrev, nextNum, prevNum, pages } = paginationData;
    let paginate;

    const renderPaginate = () => {
        let paginateItems = [];
        for (let pageNumber = 1; pageNumber <= pages; pageNumber++) {
            const isCurrent = itemId ? pageNumber === itemId : false;
            const paginateItem = (
                <LinkItem current={isCurrent} key={pageNumber} to={baseRoute({ itemId, pageNumber })}>
                    {pageNumber}
                </LinkItem>
            );
            paginateItems = [...paginateItems, paginateItem];
        }
        paginate = <Wrapper>{paginateItems}</Wrapper>;

        return paginate;
    };

    return renderPaginate();
};
