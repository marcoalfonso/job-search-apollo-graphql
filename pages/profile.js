import Octicon, { Star } from '@githubprimer/octicons-react';
import React, { Fragment } from 'react';
import { css } from 'emotion';
import Head from 'next/head';

import { Card, Container, FlexGroup, H2, Page } from '../primitives';
import { UserConsumer } from '../components/UserContext';
import { colors, gutter, Lorem } from '../utils';
import { Redirect } from '../components/Router';
import { JobItem } from '../components/JobItem';

export const NoFavorites = () => (
	<div className={css({ padding: gutter * 2, textAlign: 'center' })}>
		<h1>No favorites</h1>
		<p>
			You can favourite a job by clicking on the <Octicon icon={Star} /> button
			on a Job listing.
		</p>
	</div>
);

export default class Profile extends React.Component {
	render() {
		return (
			<UserConsumer>
				{({ user }) => {
					const id = user.id;
					return user.favorites.length === 0 ? (
						<NoFavorites />
					) : (
						<Page
							main={
								<Fragment>
									<Head>
										<title>Your Profile</title>
									</Head>
									<H2>Saved Listings</H2>
									<Card>
										{user.favorites.map((job, idx) => (
											<JobItem key={job.id} job={job} index={idx} />
										))}
									</Card>
								</Fragment>
							}
						/>
					);
				}}
			</UserConsumer>
		);
	}
}
