function postedBy(parent, args, context){
  return context.prisma.link({id: parent.id}).postedBy();
}//end postedBy

function votes(parent, args, context, info){
  return context.prisma.link({id: parent.id}).votes();
}//end votes

module.exports= {
  postedBy,
  votes,
}