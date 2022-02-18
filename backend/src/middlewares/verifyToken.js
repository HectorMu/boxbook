const jwt = require("jsonwebtoken");

const verifiyToken = (req, res, next) => {
  //If access token doesnt exists
  if (!req.headers.authorization)
    return res.status(401).json({ authorized: false });

  //If token exists
  const AccessToken = req.headers.authorization.split(" ")[1];

  try {
    const decodedAccessToken = jwt.verify(
      AccessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    //Attach the access token to the request
    req.user = decodedAccessToken;

    if (decodedAccessToken) next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ authorized: false });
  }
};

module.exports = verifiyToken;
