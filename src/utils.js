const jwt= require('jsonwebtoken');
const APP_SECRET= 'Keep it secret, keep it safe!';

function getUserId( context ){
  const Authorization= context.request.get('Authorization');

  if( Authorization ){
    const token= Authorization.replace('Bearer ', '');
    const {userId}= jwt.verify(token, APP_SECRET);
    return userId;
  }//end if

  throw new Error('Not authorized');
}//end getUserId

module.exports= {
  APP_SECRET,
  getUserId
}