import { Immutable } from "immutable-typescript";
import { Link } from "react-router-dom";
import { I18N } from "../../i18n/i18n";

import * as React from "react";

interface PaginationData {
    hasNext: boolean;
    hasPrev: boolean;
    nextNum: number;
    prevNum: number;
    pages: number;
}

interface PaginationProps {
    i18n: Immutable<I18N>;
    paginationData: Immutable<PaginationData>;
    baseRoute: ({categoryId, pageNumber}: {categoryId: number, pageNumber: number}) => any;
    fetchDataForCurrentPage: ({categoryId, pageNumber}: {categoryId?: number, pageNumber: number}) => void;
    categoryId?: number;
}

export const PaginationComponent: React.SFC<PaginationProps> = props => {
    const { paginationData, i18n, fetchDataForCurrentPage, baseRoute, categoryId } = props;
    const { hasNext, hasPrev, nextNum, prevNum, pages } = paginationData;
    let paginate;

    const renderPaginate = () => {
        let paginateItems = [];
        for (let pageNumber = 1; pageNumber <= pages; pageNumber++) {
            const paginateItem = (
                <li key={pageNumber}>
                    <Link onClick={() => fetchDataForCurrentPage({ categoryId, pageNumber })} to={baseRoute({ categoryId, pageNumber })}>
                        {pageNumber} |
                    </Link>
                </li>
            );
            paginateItems = [...paginateItems, paginateItem];
        }
        paginate = <ul style={{ display: "flex" }}>{paginateItems}</ul>;

        return paginate;
    };

    return <>Pagination: {renderPaginate()}</>;
};
