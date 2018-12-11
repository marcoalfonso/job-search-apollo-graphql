import React, { createContext } from 'react';
import getConfig from 'next/config';
import Router from 'next/router';

import { AUTH_TOKEN } from '../constants';

const initialiseUserData = data => ({
	id: undefined,
	name: '',
	email: '',
	favorites: [],
	...data,
});

const getIsLoggedIn = user => user.id !== undefined;
const UserContext = createContext();

export class UserProvider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: initialiseUserData(props.initialUserValue),
			isLoggedIn: '',
		};
	}

	componentDidMount() {
		this.authToken = JSON.parse(localStorage.getItem(AUTH_TOKEN));
		if (this.authToken) {
			this.setState({
				user: this.authToken.user,
				isLoggedIn: this.authToken.isLoggedIn,
			});
		}
	}

	addFavorite = async (jobId, data) => {
		const { user } = this.state;
		const userId = user.id;

		if (!getIsLoggedIn(user)) return;

		const favorites = data.addFavorite;
		this.setState({ user: { ...user, favorites } });
	};

	removeFavorite = async (jobId, data) => {
		const { user } = this.state;
		const userId = user.id;

		if (!getIsLoggedIn(user)) return;

		const favorites = data.removeFavorite;
		this.setState({ user: { ...user, favorites } });
	};

	render() {
		const { user, isLoggedIn } = this.state;
		return (
			<UserContext.Provider
				value={{
					user: {
						...user,
						isLoggedIn: isLoggedIn,
						addFavorite: this.addFavorite,
						removeFavorite: this.removeFavorite,
					},
				}}
				children={this.props.children}
			/>
		);
	}
}

export const UserConsumer = UserContext.Consumer;

export const withUser = WrappedComponent => {
	return class User extends React.Component {
		static displayName = `withUser(${WrappedComponent.displayName ||
			WrappedComponent.name})`;

		render() {
			return (
				<UserContext.Consumer>
					{({ user }) => <WrappedComponent {...this.props} user={user} />}
				</UserContext.Consumer>
			);
		}
	};
};
