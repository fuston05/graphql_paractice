const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const {APP_SECRET, getUserId}= require('../utils');

async function signup(root, args, context, info){

  const password= await bcrypt.hash(args.password, 10);
  const user= await context.prisma.createUser({...args, password});
  const token= jwt.sign({userId: user.id}, APP_SECRET);

  return {
    token,
    user
  }
}//end signup

async function login(parent, args, context, info){

  const user= await context.prisma.user({email: args.email});
  if( !user ){
    throw new Error('No such user found');
  }//end if

  const valid= await bcrypt.compare(args.password, user.password);
  if(!valid){
    throw new Error('Invalid password');
  }//end if

  const token= jwt.sign({userId: user.id}, APP_SECRET);

  return {
    token,
    user
  }
}//end login

function post(parent, args, context, info){
  const userId= getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  });
}//end post mutation

async function vote( parent, args, context, info ){
  const userId= getUserId(context);
  const voteExists= await context.prisma.$exists.vote({
    user: {id: userId},
    link: {id: args.linkId},
  })//end voteExists
  if(voteExists){
    throw new Error(`Already voted for link: ${args.linkId}`);
  }//end if
  return context.prisma.createVote({
    user: {connect: {id: userId}},
    link: {connect: {id: args.linkId}}
  })//end return
}//end vote

module.exports= {
  login,
  signup,
  post,
  vote
}