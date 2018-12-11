const { find, filter } = require('lodash');

const JOBS = require('./data/jobs.json');
const USERS = require('./data/users.json');

var jobsData = JOBS;
var usersData = USERS;

const searchJobs = search =>
	jobsData.filter(
		job => job.title.toLowerCase().indexOf(search.toLowerCase()) > -1
	);

const saveUserFavorites = (userID, favorites) =>
	usersData.some((user, i) => {
		if (user.id === userID) {
			usersData[i].favorites = favorites;
			return true;
		}
	});

const resolvers = {
	Query: {
		getUser: (_, { id }) => find(usersData, { id: id }),
		jobs: (root, args) => {
			const search = args.searchQuery;
			const start = 0;
			const length = 20;
			const begin = parseInt(start);
			const end = begin + parseInt(length);
			if (search) {
				return searchJobs(search).slice(begin, end);
			} else {
				return jobsData.slice(begin, end);
			}
		},
		job: (_, { id }) => find(jobsData, { id: id }),
		login: (_, { email }) => find(usersData, { email: email }),
	},
	Mutation: {
		addFavorite: (root, args) => {
			const { favorites } = find(usersData, { id: args.userId });

			const job = find(jobsData, { id: args.jobId });

			if (!favorites.includes(job)) {
				favorites.push(job);
				saveUserFavorites(args.userId, favorites);
			}

			return favorites;
		},
		removeFavorite: (root, args) => {
			let { favorites } = find(usersData, { id: args.userId });
			const newFavorites = favorites.filter(job => job.id != args.jobId);
			saveUserFavorites(args.userId, newFavorites);
			favorites = newFavorites;
			return favorites;
		},
	},
};

module.exports = resolvers;
