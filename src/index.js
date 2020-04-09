const {GraphQLServer}= require('graphql-yoga');
const {prisma}= require('./generated/prisma-client');

//resolvers
const resolvers= {
  Query: {
    info: () => `This is my practice API`,
    feed: (root, args, context, info) => {
      return context.prisma.links()
      }
  },
  
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    }
  }
};

//server
const server= new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {prisma},
});

server.start( () => console.log(`server is running on http://localhost:4000`) );
