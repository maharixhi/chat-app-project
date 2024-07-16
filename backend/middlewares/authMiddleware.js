import jwt from 'jsonwebtoken'

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "User not Authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded)
    if(!decoded){
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuthenticated;
