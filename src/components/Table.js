import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

function Table(props) {
    return (
        <table className="table table-sortable">
            <TableHeader {...props}/>
            <TableBody {...props}/>
        </table>
    );
}

export default Table;