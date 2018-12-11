const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const express = require('express');
const nextApp = require('next');
const { ApolloServer, gql } = require('apollo-server-express');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = nextApp({ dev });
const handle = app.getRequestHandler();
const schema = require('./schema');
const resolvers = require('./resolvers');

const graphQLServer = new ApolloServer({
	typeDefs: schema,
	resolvers: resolvers,
	playground: {
		endpoint: '/graphql',
	},
	bodyParser: true,
	//TODO implement apollo-server authentication
	// context: ({ req }) => {
	//    // get the user token from the headers
	//    const token = req.headers.authorization || '';
	//
	//    // try to retrieve a user with the token
	//    const user = getUser(token);
	//
	//    // add the user to the context
	//    return { user };
	//  },
});

app.prepare().then(() => {
	const server = express();

	graphQLServer.applyMiddleware({
		app: server,
	});

	// Serve staic assets
	server.use(express.static('./public'));

	// Dynamic Job Route
	server.get('/job/:jobId', (req, res) => {
		// Pass the params in
		const { jobId } = req.params;
		app.render(req, res, '/job', { jobId, ...req.query });
	});

	// Handle all other routes
	server.get('*', handle);

	server.listen(port, error => {
		if (error) throw error;
		console.log(`> Server started on http://localhost:${port}`);
		console.log(
			`> GraphQL Server (And GraphQL Playground) ready at http://localhost:${port}${
				graphQLServer.graphqlPath
			}`
		);
	});
});
