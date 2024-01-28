var { expressjwt: jwt } = require('express-jwt');

const jwtMiddleware = jwt({
  secret: process.env.JWT_SECRET as string,
  algorithms: ['HS256'],
  userProperty: 'auth'
});

export { jwtMiddleware };
