import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { JobItem } from './JobItem';
import { NoResults } from '../components/NoResults';

const Jobs = (searchQuery, onClear) => (
	<Query query={GET_JOBS} variables={searchQuery}>
		{({ loading, error, data }) => {
			if (loading) return null;
			if (error) return `Error!: ${error}`;
			const hasNoResults = data.jobs.length === 0;
			if (hasNoResults) {
				return <NoResults onClearSearch={() => onClear} />;
			} else {
				return data.jobs.map((job, idx) => (
					<JobItem key={job.id} job={job} index={idx} />
				));
			}
		}}
	</Query>
);

const GET_JOBS = gql`
	query jobs($searchQuery: String) {
		jobs(searchQuery: $searchQuery) {
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

export default Jobs;
