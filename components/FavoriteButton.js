import React, { Component } from 'react';
import { Mutation, graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Octicon, { Check, Star } from '@githubprimer/octicons-react';
import { css } from 'emotion';
import { find, filter } from 'lodash';

import { FlexGroup, IconButton } from '../primitives';
import { UserConsumer } from './UserContext';
import { colors, gutter } from '../utils';

class FavoriteButton extends Component {
	render() {
		const handleClick = (user, id, isSaved) => () => {
			if (!user.isLoggedIn) {
				return alert('You must be logged in to favorite.');
			}
			const userId = user.id;
			if (isSaved) {
				this.props
					.removeFavorite({
						variables: {
							jobId: id,
							userId: userId,
						},
					})
					.then(({ data }) => {
						return user.removeFavorite(id, data);
					})
					.catch(error => {
						console.log(error);
					});
			} else {
				this.props
					.addFavorite({
						variables: {
							jobId: id,
							userId: userId,
						},
					})
					.then(({ data }) => {
						return user.addFavorite(id, data);
					})
					.catch(error => {
						console.log(error);
					});
			}
		};

		return (
			<UserConsumer>
				{({ user }) => {
					const id = this.props.id;
					const isLarge = this.props.isLarge;
					const isSaved =
						Array.isArray(user.favorites) && find(user.favorites, { id: id });
					const onClick = handleClick(user, id, isSaved);
					if (isLarge) {
						return (
							<IconButton onClick={onClick} icon={isSaved ? Check : Star}>
								{isSaved ? 'Saved' : 'Save'}
							</IconButton>
						);
					} else {
						return (
							<button
								onClick={onClick}
								className={css({
									background: isSaved ? colors.green['50'] : colors.amber['50'],
									border: 0,
									borderRadius: 2,
									color: isSaved ? colors.green['500'] : colors.amber['800'],
									cursor: 'pointer',
									padding: `${gutter / 4}px ${gutter}px`,

									':hover, :focus': {
										background: isSaved
											? colors.green['100']
											: colors.amber['100'],
										outline: 0,
									},
								})}
							>
								<FlexGroup>
									<Octicon icon={isSaved ? Check : Star} />
									{isSaved ? 'Saved' : 'Save'}
								</FlexGroup>
							</button>
						);
					}
				}}
			</UserConsumer>
		);
	}
}

const addFavorite = gql`
	mutation addFavorite($jobId: String!, $userId: Int!) {
		addFavorite(jobId: $jobId, userId: $userId) {
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
`;

const removeFavorite = gql`
	mutation removeFavorite($jobId: String!, $userId: Int!) {
		removeFavorite(jobId: $jobId, userId: $userId) {
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
`;

export default compose(
	graphql(addFavorite, { name: 'addFavorite' }),
	graphql(removeFavorite, { name: 'removeFavorite' })
)(FavoriteButton);
