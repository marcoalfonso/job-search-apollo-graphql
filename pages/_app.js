import App, { Container } from 'next/app';
import getConfig from 'next/config';
import React from 'react';
import { ApolloProvider } from 'react-apollo';

import { UserProvider } from '../components/UserContext';
import Navbar from '../components/Navbar';
import withApolloClient from '../lib/with-apollo-client';

class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {
		let pageProps = {};
		const user = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps({ user, ...ctx });
		}

		return { pageProps, user };
	}

	render() {
		const { Component, pageProps, user, apolloClient } = this.props;
		return (
			<ApolloProvider client={apolloClient}>
				<UserProvider initialUserValue={user}>
					<div className="App">
						<Navbar />
						<Component {...pageProps} />
					</div>
				</UserProvider>
			</ApolloProvider>
		);
	}
}

export default withApolloClient(MyApp);
