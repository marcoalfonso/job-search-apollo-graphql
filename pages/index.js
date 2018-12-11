import React, { Component, Fragment } from 'react';

import Router from 'next/router';
import Head from 'next/head';

import { Button, Card, Container, Page } from '../primitives';
import { SearchForm } from '../components/SearchForm';
import Jobs from '../components/Jobs';
import { history } from '../utils';

export default class Home extends Component {
	state = {
		search: this.props.search || '',
		searchQuery: this.props.searchQuery || '',
	};

	onSearch = event => {
		this.setState({ search: event.target.value });
	};

	handleSearchClear = () => {
		this.setState({ search: '', searchQuery: '' });
	};

	handleSearchSubmit = e => {
		const { search } = this.state;
		this.setState({ searchQuery: search });
		e.preventDefault();
	};

	uploadResume = () => {
		alert('Temporary disabled due to high demand!');
	};

	render() {
		const { search, searchQuery } = this.state;

		return (
			<Fragment>
				<Head>
					<title>Job Search</title>
				</Head>
				<Container>
					<SearchForm
						onChange={this.onSearch}
						onSubmit={this.handleSearchSubmit}
						onClear={this.handleSearchClear}
						value={search}
					/>
				</Container>
				<Page
					main={
						<Card>
							<Jobs
								searchQuery={searchQuery}
								onClear={() => this.handleSearchClear}
							/>
						</Card>
					}
					aside={
						<Fragment>
							<p>Let employers find you:</p>
							<Button
								appearance="secondary"
								isBlock
								onClick={this.uploadResume}
							>
								Upload your resumé
							</Button>
						</Fragment>
					}
				/>
			</Fragment>
		);
	}
}
