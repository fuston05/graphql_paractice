const { GraphQLServer } = require('graphql-yoga');
const {prisma}= require('./generated/prisma-client');

//resolvers
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Vote= require('./resolvers/Vote');

//subscriptions
const Subscription= require('./resolvers/Subscription');

//implementation of schema
const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
}//end resolvers

//tells the server what API operations are 
//accepted and how they should be resolved.
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return{
      ...request,
      prisma
    }
  }
});

server.start(() => console.log('Server is running on http://localhost:4000'));