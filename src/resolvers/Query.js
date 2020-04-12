function feed(root, args, context, info){
  return context.prisma.links();
}//end feed

module.exports= {
  feed
}