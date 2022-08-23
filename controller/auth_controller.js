import User_Model from "../model/user_Model.js";
import Customer_Model from "../model/customer_model.js";
import Mechanic_Model from "../model/mechanic_model.js";
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const dbResponse = await User_Model.findOne({
      email: email,
      password: password,
    });
    if (dbResponse) {
      const { email, role } = dbResponse;
      let user = {};
      console.log("user :", dbResponse);
      if (role == "customer") {
          const dbUser = await Customer_Model.findOne({ email: email });
          console.log(dbUser)
        res.status(200).json({
          type: role,
          name: dbUser.name,
          email: dbUser.email,
          id: dbUser._id,
          password: dbUser.password,
          success: true,
        });
      } else if (role == "mechanic") {
        const dbUser = await Mechanic_Model.findOne({ email: email });
        res.status(200).json({
          type: role,
          name: dbUser.name,
          email: dbUser.email,
          id: dbUser._id,
          password: dbUser.password,
          success: true,
        });
        }
      else {
          res.status(401).json({message:"role is not defined"})
        }
    } else {
    res.status(401).json({ message: "email or password is not correct" });
        
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
