const jwt = require('jsonwebtoken');

// Ye function ek "Security Guard" ka kaam karta hai
const protect = (req, res, next) => {
  // Frontend/Postman apna token 'Authorization' header mein bhejta hai
  let token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer')) {
    return res.status(401).json({ message: "Bina Login ke aap andar nahi aa sakte! (No Token)" });
  }

  try {
    // Token kuch is tarah aata hai: "Bearer eyJhbGc..." 
    // Isliye hum use tod (split) kar sirf token wala hissa nikal rahe hain.
    token = token.split(' ')[1];
    
    // Asli token ko secret key ke sath match karke open karna
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // User ki ID nikal kar aage controllers ke liye bhej dena
    req.user = decoded; 
    
    // "Security check pass ho gaya, aage badho"
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Token Invalid ya Expire ho chuka hai!" });
  }
};

// 🔥 NAYA GUARD: Sirf Admin ko aage jaane dega
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Pass ho gaya
  } else {
    res.status(403).json({ message: "Access Denied: Sirf Admin ko hi ijaazat hai! ⛔" });
  }
};

module.exports = { protect, adminOnly };
