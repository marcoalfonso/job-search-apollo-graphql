import { Mail } from '@githubprimer/octicons-react';
import React, { Component, Fragment } from 'react';
import { css } from 'emotion';
import Head from 'next/head';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';

import { Button, Card, Page, FlexGroup, IconButton, H1 } from '../primitives';
import { colors, formatDate, gutter, Lorem } from '../utils';
import FavoriteButton from '../components/FavoriteButton';
import { NotFound } from '../components/NotFound';
import { AUTH_TOKEN } from '../constants';

class Details extends Component {
	applyForJob = () => {
		alert('Good Luck!');
	};

	sendJob = () => {
		alert('Sent!');
	};

	render() {
		const id = this.props.router.query.jobId;

		return (
			<Query query={GET_JOB} variables={{ id }}>
				{({ data, loading, error, refetch, networkStatus }) => {
					if (loading) return null;
					if (error) return `Error!: ${error}`;
					if (!data.job) return <NotFound />;
					return (
						<Fragment>
							<Head>
								<title>Job Details: {data.job.title}</title>
							</Head>
							<Page
								main={
									<Card pad>
										<H1>{data.job.title}</H1>
										<p>{data.job.description}</p>
										<div
											className={css({
												color: colors.grey['600'],
												fontSize: 14,
												marginTop: gutter,
											})}
										>
											<Lorem count={4} />
										</div>
									</Card>
								}
								aside={
									<aside>
										<Button
											appearance="secondary"
											isBlock
											onClick={this.applyForJob}
										>
											Apply for this job
										</Button>
										<FlexGroup stretch style={{ marginTop: gutter }}>
											<FavoriteButton id={data.job.id} isBlock isLarge />
											<IconButton onClick={this.sendJob} isBlock icon={Mail}>
												Send
											</IconButton>
										</FlexGroup>

										<Card
											pad
											style={{ fontSize: '0.85rem', marginTop: gutter * 3 }}
										>
											<img
												src={data.job.logo}
												alt={data.job.source}
												className="mr-3"
												style={{ maxWidth: 100 }}
											/>
											<div>Added: {formatDate(data.job.dateAdded)}</div>
											<div>Source: {data.job.source}</div>
										</Card>
									</aside>
								}
							/>
						</Fragment>
					);
				}}
			</Query>
		);
	}
}

const GET_JOB = gql`
	query job($id: String) {
		job(id: $id) {
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

export default withRouter(Details);
