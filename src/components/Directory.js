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
        sort: 'asc'
    };

    get sortDirection() {
        return {
            name: "",
            phone: "",
            email: "",
            dov: ""
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

    handleSort = (key) => {
        if (this.state.sort === 'asc') {
            this.setState({ sort: 'desc' })
        } else {
            this.setState({ sort: 'asc'})
        }

        if (this.state.sort === 'asc') {
            const sortRes = this.state.results.sort((a, b) => {
                return (a.name.first < b.name.first) ? -1 : 1
            })
            this.setState({ results: sortRes })
        } else {
            const sortRes = this.state.results.sort((a, b) => {
                return (b.name.first < a.name.first) ? -1 : 1
            })
            this.setState({ results: sortRes })
        }
    }

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
