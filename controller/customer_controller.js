import Customer_Model from "../model/customer_model.js";
import User_Model from "../model/user_Model.js";
export const createCustomer = async(req, res) => {
      const { name, email, city, phone_no,password } = req.body;
     const newCustomer = Customer_Model({
       name: name,
       email: email,
       city: city,
       phone_no: phone_no,
       password: password,
     });
     const newUser = User_Model({
       role: "customer",
       email: email,
       password: password,
     });
    
     try {
       const dbResponse = await newCustomer.save()
       await newUser.save()
          res.status(201).json(dbResponse)
     } catch (error) {
          res.status(201).json({message:error.message})
          
     }
}
export const getCustomerById = async(req, res) => {
    const id = req.params.id;
    try {
      const customer = await Customer_Model.findById(id);
      res.status(200).json({success:true,data:customer,message:"data found"})
    } catch (error) {
      res.status(200).json({ success: false, message:error.message });
      
    }
}