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
    baseRoute: string;
    fetchDataForCurrentPage: (pageNumber: number) => void;
}

export const PaginationComponent: React.SFC<PaginationProps> = props => {
    const { paginationData, i18n, fetchDataForCurrentPage, baseRoute } = props;
    const { hasNext, hasPrev, nextNum, prevNum, pages } = paginationData;
    let paginate;

    const renderPaginate = () => {
        const paginateItems = [];
        for (let i = 1; i <= pages; i++) {
            const paginateItem = (
                <li key={i}>
                    <Link onClick={() => fetchDataForCurrentPage(i)} to={baseRoute + i.toString()}>
                        {i} |
                    </Link>
                </li>
            );
            paginateItems.push(paginateItem);
        }
        paginate = <ul style={{ display: "flex" }}>{paginateItems}</ul>;

        return paginate;
    };

    return <>Pagination: {renderPaginate()}</>;
};
