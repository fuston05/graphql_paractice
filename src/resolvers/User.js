
function links(parent, args, context){

  return context.prisma.user({id: parent.id}).links();

}//end links

module.exports= {
  links
}