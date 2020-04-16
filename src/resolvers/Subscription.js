function newLinkSubscribe(parent, args, context, info){
  return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node();
}//end newLinkSubscribe

const newLink= {
  subscribe: newLinkSubscribe,
  resolve: payload => {
    return payload;
  }//end resolve
}//end newLink

function newVoteSubscribe(parent, args, context, info){
  return context.prisma.$subscribe.vote({mutation_in: ['CREATED']}).node();
}//end newVoteSubscribe

const newVote= {
  subscribe: newVoteSubscribe,
  resolve: payload => {
    return payload
  }//end resolve
}//end newVote

module.exports= {
  newLink,
  newVote,
}