//dotenv
require('dotenv').config();

//import graphQL
const {GraphQLServer} = require('graphql-yoga');

//typeDefs, 
const typeDefs= `
  type Query{
    info: String!
  }
`

//resolvers, js obj notation
const resolvers= {
  Query: {
    info: () => 'this is my test info'
  }//end query
}//end resolvers

//server options
const options= {
  port: process.env.PORT || 5000
}//end options

//server
const server= new GraphQLServer({
  typeDefs,
  resolvers
})//end server 

// start server
server.start(options, () => {
  console.log( `Server running on port:${options.port}` );
} )