import React from "react";
import { format } from "date-fns";

function TableBody(props) {
    return (
        <tbody>
            {props.state.filteredResults.map(result => {
                const fullName = result.name.first + " " + result.name.last;
                const dob = format(new Date(result.dob.date), 'MM/dd/yyyy');

                return (
                    <tr key={result.login.uuid}>
                        <td><img alt={fullName + " photo."} src={result.picture.thumbnail} /></td>
                        <td>{fullName}</td>
                        <td>{result.email}</td>
                        <td>{dob}</td>
                        <td>{result.phone}</td>
                    </tr>
                )
            })}
        </tbody>
    );
}

export default TableBody;