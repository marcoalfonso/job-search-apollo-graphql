const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		id: Int!
		name: String
		email: String
		favorites: [Job]
	}

	type Job {
		id: String
		title: String
		logo: String
		source: String
		suburb: String
		labels: [String]
		description: String
		dateAdded: String
	}

	type Query {
		getUser(id: Int!): User
		jobs(searchQuery: String): [Job]
		job(id: String): Job
		login(email: String): User
	}

	type Mutation {
		addFavorite(jobId: String!, userId: Int!): [Job]
		removeFavorite(jobId: String!, userId: Int!): [Job]
	}
`;

const schema = typeDefs;

module.exports = schema;
