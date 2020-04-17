require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');

// fake database
const users= [];
let count= 1;

//typeDefs SDL
const typeDefs = `
  type Query {
    users: [User!]!
    user(id: ID!) : User
  }

  type User {
    id: ID!
    name: String!
    phone: Phone!
  }

  type Phone {
    number: String!
    belongsTo: User!
  }

  type Mutation {
    createUser(name: String!) : User
  }
`;// end typeDefs

//resolvers (object)
const resolvers = {
  Query: {
    user: (parent, args, context, info) => {
      return users.find( user => parseInt(user.id) === parseInt(args.id))
    },//user

    users: () => {return users}
  },//end query

  Mutation: {
    createUser: (parent, args, context, info) => {  
      const newUser= {name: args.name, id: count};
      if(users.push(newUser)){
        count++;
        return newUser;
      }//end if
    },//end createUser

  }//end Mutation
}//end resolvers




//server options
const opts= {
  port: process.env.PORT,
  endpoint: '/graphql'
}

//server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  opts
});//end server

//server start
server.start(() =>{
  console.log(`Server running on http://localhost:${opts.port}${opts.endpoint}`);
});