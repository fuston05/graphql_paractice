const {GraphQLServer}= require('graphql-yoga');

const links= [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL',
}];

let idCount= links.length;

//resolvers
const resolvers= {
  Query: {
    info: () => `This is my practice API`,
    feed: () => links,
  },
  
  Mutations: {
    post: (parent, args) => {
      const link= {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    }
  },
};

//server
const server= new GraphQLServer({
  typeDefs: './scr/schema.graphql',
  resolvers
});

server.start( () => console.log(`server is running on http://localhost:4000`) );
