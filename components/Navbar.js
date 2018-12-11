import Octicon, {
	Briefcase,
	SignOut,
	SignIn,
} from '@githubprimer/octicons-react';
import React, { Component, createRef, forwardRef, Fragment } from 'react';
import { css } from 'emotion';
import Router from 'next/router';

import { Container, FlexGroup, ScrollSensor, Use } from '../primitives';
import { UserConsumer } from './UserContext';
import { colors, gutter } from '../utils';
import { Link } from './Router';

import { AUTH_TOKEN } from '../constants';

const Header = forwardRef(({ hasScroll, ...props }, ref) => (
	<header
		className={css({
			backgroundColor: 'white',
			boxShadow: hasScroll
				? '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1)'
				: '0 1px 0 rgba(0, 0, 0, 0.1)',
			left: 0,
			position: 'fixed',
			right: 0,
			top: 0,
			transition: 'box-shadow 200ms',
			zIndex: 3,
		})}
		ref={ref}
		{...props}
	/>
));

export const NavItem = ({
	avatar,
	children,
	icon,
	iconSize = 'small',
	onClick,
	to,
	...rest
}) => {
	const as = to ? Link : 'button';
	return (
		<Use
			as={as}
			to={to}
			onClick={onClick}
			className={css({
				background: 0,
				border: 0,
				cursor: 'pointer',

				':hover, :focus': {
					color: colors.blue.a700,
					outline: 0,
					textDecoration: 'underline',
				},
			})}
			{...rest}
		>
			{icon || avatar ? (
				<FlexGroup align="center">
					{avatar ? (
						<img
							alt="avatar"
							height="32"
							width="32"
							className={css({
								backgroundColor: colors.blueGrey['100'],
								borderRadius: '50%',
								display: 'block',
							})}
							src={avatar}
						/>
					) : (
						<Octicon icon={icon} size={iconSize} />
					)}
					{children}
				</FlexGroup>
			) : (
				children
			)}
		</Use>
	);
};

export const NavLogout = ({ user }) => {
	const redirect = '/';

	return (
		<form
			onSubmit={event => {
				localStorage.removeItem(AUTH_TOKEN);
				Router.push(redirect);
			}}
		>
			<NavItem icon={SignOut} type="submit">
				Logout
			</NavItem>
		</form>
	);
};

export const NavUserName = ({ user }) => (
	<NavItem
		to="/profile"
		avatar={`https://api.adorable.io/avatars/64/${user.name}.png`}
	>
		{user.name}
	</NavItem>
);

export default class Navbar extends Component {
	state = {
		spacerHeight: 68,
	};
	headerRef = createRef();

	componentDidMount = () => {
		this.setState({ spacerHeight: this.headerRef.current.clientHeight });
	};

	render() {
		const { spacerHeight } = this.state;
		const padding = { paddingBottom: gutter * 2, paddingTop: gutter * 2 };

		return (
			<UserConsumer>
				{({ user }) => (
					<Fragment>
						<ScrollSensor>
							{({ scrollY }) => (
								<Header ref={this.headerRef} hasScroll={Boolean(scrollY)}>
									<Container>
										<FlexGroup
											justify="space-between"
											align="center"
											style={padding}
										>
											<NavItem to="/" icon={Briefcase} iconSize="medium">
												<span style={{ fontSize: 24 }}>Job Search</span>
											</NavItem>

											{user.isLoggedIn ? (
												<FlexGroup align="center">
													<NavUserName user={user} />
													<NavLogout user={user} />
												</FlexGroup>
											) : (
												<NavItem to="/login" icon={SignIn}>
													Login
												</NavItem>
											)}
										</FlexGroup>
									</Container>
								</Header>
							)}
						</ScrollSensor>
						<div style={{ height: spacerHeight, marginBottom: gutter * 3 }} />
					</Fragment>
				)}
			</UserConsumer>
		);
	}
}
