import React, { Component } from "react";
import SearchForm from "./SearchForm";
import Container from "./Container";
import Card from "./Card";
import Row from "./Row";
import Table from "./Table";
import API from "../utils/API";

class Directory extends Component {
    state = {
        results: [],
        filteredResults: [],
        search: "",
        sort: ""
    };

    get sortDirection() {
        return {
            name: "",
            email: "",
            dob: "",
            phone: ""
        }
    };

    componentDidMount() {
        this.searchEmployees();
    }

    searchEmployees = () => {
        API.search()
            .then(res => this.setState({
                results: res.data.results,
                filteredResults: res.data.results
            }))
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const value = event.target.value;
        this.setState({ search: value });
        this.filterResults(value.toLowerCase().trim());
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const search = event.target.value;
        this.filterResults(search);
    };

    // Key - what is being sorted, checks for a first name or date and a last name
    handleSort = (key, primary, secondary) => {
        // Sets an easier var for filtered results
        let sortedEmployees = this.state.filteredResults;
        // If the clicked column is already sorted, then...
        if (this.state.sort[key]) {
            // Reverse the sort
          this.setState({
            filteredResults: sortedEmployees.reverse(),
            // Change the value to the opposite
            sort: {
              // Spreader - resets any columns with values
              ...this.sortDirection,
              // Change the value of that column in "sort" to opposite
              [key]: this.state.sort[key] === "asc" ? "desc" : "asc",
            },
          });
        // If the clicked column isn't sorted yet, then...
        } else {
          // Sort filteredResults
          sortedEmployees = this.state.filteredResults.sort((a, b) => {
            // a and b are what are to be compared in the sort - similar to mapping, it will go one by one through the results/filtered results
            // Line below gets value from the results of only the needed column
            a = a[key];
            b = b[key];
    
            // If there is a primary (ex. name or dob) then...
            if (primary) {
              // If there is a secondary (last name) and the first names match, then...
              if (secondary && a[primary] === b[primary]) {
                // Return a number showing whether the last name of the person with the current highest value comes before or after the next person's last name
                // Sorts each name by first, then last if the first names match
                return a[secondary].localeCompare(b[secondary]);
              }
              // If there are no secondary, only primary (dob), then...
              // Return a number showing whether the date of birth of the person with the current highest value comes before or after the next person's date of birth
              return a[primary].localeCompare(b[primary]);
            // If no primary (email or phone), then...
            } else {
              // Return a number showing whether the email or phone of the person with the current highest value comes before or after the next person's phone or email
              return a.localeCompare(b);
            }
          }
          );
    
          // Set the new state
          this.setState({
            // Sets the filtered results equal to the new sort order
            filteredResults: sortedEmployees,
            // Changes the sort
            sort: {
              // Spreader - resets any columns with values
              ...this.sortDirection,
              // Set the value of the clicked column to ascending
              // Will change to opposite from here on out
              [key]: "asc",
            },
          });
        }
    };

    filterResults = (input) => {
        if (input) {
            const filterRes = this.state.results.filter(result => {
                let data = Object.values(result).join('').toLowerCase();
                return data.indexOf(input.toLowerCase()) !== -1;
            })
            this.setState({filteredResults: filterRes})
        } else {
            this.setState({ filteredResults: this.state.results });
        }
    };

    render() {
        return (
            <Container>
                <Row>
                    <div>
                        <Card>
                        <SearchForm
                            value={this.state.search}
                            handleInputChange={this.handleInputChange}
                            handleFormSubmit={this.handleFormSubmit}
                        />
                            {this.state.results ? (
                            <Table
                                state={this.state}
                                handleSort={this.handleSort}
                                filterResults={this.filterResults}
                                formatDate={this.formatDate}
                            />
                            ) : (
                            <h3>No Results to Display</h3>
                            )}
                        </Card>
                    </div>
                </Row>
            </Container>
        );
    }
}

export default Directory;
