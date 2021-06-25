import React from "react";

function TableHeader(props) {
    return (
        <thead>
            <tr>
                <th scope="col">Photo</th>
                <th scope="col"><span onClick={() => props.handleSort("name","first","last")}>Name (First, last)</span></th>
                <th scope="col"><span onClick={() => props.handleSort("email")}>Email</span></th>
                <th scope="col"><span onClick={() => props.handleSort("dob","date")}>Date of Birth</span></th>
                <th scope="col"><span onClick={() => props.handleSort("phone")}>Phone</span></th>
            </tr>
        </thead>
    );
}

export default TableHeader;