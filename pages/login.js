import React, { Fragment } from 'react';
import { css } from 'emotion';
import Head from 'next/head';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import { Button, Container, Input, H2, Grid, GridCell } from '../primitives';
import { UserConsumer } from '../components/UserContext';
import { Redirect } from '../components/Router';
import { AUTH_TOKEN } from '../constants';

// ==============================
// FORM
// ==============================

export class LoginForm extends React.Component {
	state = { username: '', error: false };
	inputRef = React.createRef();
	componentDidMount() {
		this.inputRef.current.focus();
	}

	handleUsernameChange = event => {
		this.setState({
			username: event.target.value,
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		const { username } = this.state;

		if (!username) {
			this.setState({ error: 'Please provide a username' });
			return;
		}

		this.props.login(username);
	};

	render() {
		const { error, username } = this.state;
		return (
			<form onSubmit={this.handleSubmit}>
				<H2 as="h1">Login</H2>
				{error ? (
					<p className={css({ color: colors.red['600'] })}>{error}</p>
				) : null}
				<p>
					<label htmlFor="username">User name</label>
					<Input
						id="username"
						name="email"
						onChange={this.handleUsernameChange}
						ref={this.inputRef}
						type="text"
						value={username}
					/>
					<input type="hidden" name="redirect" value="/profile" />
				</p>
				<Button type="submit">Login</Button>
			</form>
		);
	}
}

// ==============================
// PAGE
// ==============================

export default class Login extends React.Component {
	state = {
		email: this.props.email || '',
	};

	login = username => {
		this.setState({ email: username });
	};

	render() {
		const { email } = this.state;
		return (
			<Fragment>
				<Head>
					<title>Login</title>
				</Head>
				<Container>
					<Grid>
						<GridCell width={3} />
						<GridCell width={6}>
							<Query query={GET_USER} variables={{ email }}>
								{({ data, loading, error, refetch, networkStatus }) => {
									if (loading) return null;
									if (error) return `Error!: ${error}`;
									if (data.login) {
										const token = {
											isLoggedIn: true,
											user: data.login,
										};
										localStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
										return Router.push('/profile');
									} else {
										return <LoginForm login={this.login} />;
									}
								}}
							</Query>
						</GridCell>
						<GridCell width={3} />
					</Grid>
				</Container>
			</Fragment>
		);
	}
}

const GET_USER = gql`
	query login($email: String) {
		login(email: $email) {
			id
			name
			email
			favorites {
				id
				title
				logo
				source
				suburb
				labels
				description
				dateAdded
			}
		}
	}
`;
