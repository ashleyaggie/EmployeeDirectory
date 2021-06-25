import React from "react";

function SearchForm(props) {
  return (
    <form className="form-inline m-2" onSubmit={props.handleFormSubmit}>
        <input
          onChange={props.handleInputChange}
          value={props.value}
          name="search"
          type="search"
          className="form-control"
          placeholder="Search"
        />
    </form>
  );
}

export default SearchForm;
