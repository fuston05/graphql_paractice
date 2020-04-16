
function link(parent, args, context){
  return context.prisma.vote({id: parent.id}).link();
}//end link

function user(parent, args, context){
  return context.prisma.vote({id: parent.id}).user();
}//end user

module.exports= {
  link,
  user,
}