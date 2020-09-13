import React, { createContext, useContext } from "react";
import cx from "classnames";

import "./Table.scss";

const TableContext = createContext({});

const Cell = ({ className, children }) => {
    return (
        <td className={cx("table-cell", className)}>
            {children}
        </td>
    );
};

const Row = ({ className, children }) => (
    <tr className={cx("table-row", className)}>
        {children}
    </tr>
);

const Table = ({
    className,
    children
}) => {
    return (
        <table className={cx("table", className)}>
            <tbody>
                <TableContext.Provider>
                    {children}
                </TableContext.Provider>
            </tbody>
        </table>
    );
};

Table.Row = Row;
Table.Cell = Cell;

export default Table;
