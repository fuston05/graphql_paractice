async function feed(root, args, context, info){
  const where= args.filter ? {
    OR: [
      {description_contains: args.filter},
      {url_contains: args.filter}
    ]
  } : {}
  const links= await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first
  });
  return links;
}//end feed

module.exports= {
  feed
}