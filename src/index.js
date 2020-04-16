const { GraphQLServer } = require('graphql-yoga');

//typeDefs SDL
const typeDefs = `
  type= Query {
    info: String!
  }
`;// end typeDefs

//resolvers (object)
const resolvers = {
  Query: {
    info: () => "My test info string for graphQL."
  }
}//end resolvers

//server
const server = new GraphQLServer({
  typeDefs,
  resolvers
});//end server