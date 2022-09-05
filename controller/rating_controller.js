import Mechanic_Model from '../model/mechanic_model.js';
import Rating_Model from '../model/rating_model.js';
export const createRating = async (req, res) => {
  const {feedback, rating, mechanic_id, customer_id} = req.body;
  let sum = 0,
    count = 0;
  const newObj = Rating_Model({
    Mechanic_id: mechanic_id,
    Customer_id: customer_id,
    rating: rating,
    feedback: feedback,
  });
  try {
    const dbResponse = await newObj.save();
    const dbResponse1 = await Rating_Model.find({Mechanic_id: mechanic_id});
    if (dbResponse1.length > 0) {
      for (let i of dbResponse1) {
        sum = sum + i.rating;
        count++;
      }
      const addRatingResponse = await Mechanic_Model.updateOne(
        {
          _id: mechanic_id,
        },
        {avgRating: sum / count},
      );
      res.status(200).json({
        success: true,
        message: 'added rating',
        data: dbResponse,
      });
    }
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
export const getAvgRating = async (req, res) => {
  const {mechanic_id} = req.params;
  let sum = 0,
    count = 0;
  try {
    const dbResponse = await Rating_Model.find({Mechanic_id: mechanic_id});
    if (dbResponse.length > 0) {
      for (let i of dbResponse) {
        sum = sum + i.rating;
        count++;
      }
      res.status(200).json({
        success: true,
        message: 'avg rating calculated',
        avgRating: sum / count,
      });
    }

    res.status(200).json({
      success: true,
      message: 'avg rating calculated',
      avgRating: 0,
    });
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
export const getAvgRatingByMechanic = async mechanic_id => {
  let sum = 0,
    count = 0;
  try {
    const dbResponse = await Rating_Model.find({Mechanic_id: mechanic_id});
    if (dbResponse.length > 0) {
      for (let i of dbResponse) {
        sum = sum + i.rating;
        count++;
      }
      return {success: true, avgRating: sum / count};
    }

    return {avgRating: 0, success: true};
  } catch (error) {
    return {success: false, message: error.message};
  }
};
