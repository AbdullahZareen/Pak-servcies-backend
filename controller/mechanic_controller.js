import Mechanic_Model from '../model/mechanic_model.js';
import User_Model from '../model/user_Model.js';
import util from 'util';
export const createMechanic = async (req, res) => {
  const {name, email, city, phone_no, password, address} = req.body;
  const newMechanic = Mechanic_Model({
    name: name,
    email: email,
    city: city,
    phone_no: phone_no,
    password: password,
    address: address,
  });
  const newUser = User_Model({
    role: 'mechanic',
    email: email,
    password: password,
  });
  try {
    const dbResponse = await newMechanic.save();
    await newUser.save();
    res.status(201).json(dbResponse);
  } catch (error) {
    res.status(201).json({message: error.message});
  }
};
export const createService = async (req, res) => {
  const {id} = req.params;
  try {
    const response = await Mechanic_Model.updateOne(
      {_id: id},
      {$push: {service: req.body}},
    );
    console.log(response);
    res.status(200).json({success: true, message: 'added service'});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
export const getServiceByCity = async (req, res) => {
  console.log(req.params.serviceName);
  const city = req.params.city;
  const serviceName = req.params.serviceName;

  try {
    const mechanic = await Mechanic_Model.find({city: city});
    // .aggregate([
    //   {
    //     $unwind: {
    //       path: '$service',
    //     },
    //   },
    //   {
    //     $match: {
    //       city: city,
    //       // 'service.serviceName': serviceName,
    //     },
    //   },
    // ]);

    const Servies = mechanic.map(x => {
      return {mechanic_id: x._id, servies: x.service, avgRating: x.avgRating};
    });
    res.status(200).json({success: true, data: Servies, message: 'data found'});
  } catch (error) {
    res.status(200).json({success: false, message: error.message});
  }
};
export const getMechanicById = async (req, res) => {
  const id = req.params.id;
  try {
    const mechanic = await Mechanic_Model.findById(id);
    res
      .status(200)
      .json({success: true, data: mechanic, message: 'data found'});
  } catch (error) {
    res.status(200).json({success: false, message: error.message});
  }
};
