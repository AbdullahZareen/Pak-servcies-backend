import Chat_Model from '../model/chat_model.js';
export const createMessage = async (req, res) => {
  const {message, mechanic_id, customer_id} = req.body;
  const newObj = Chat_Model({
    Mechanic_id: mechanic_id,
    Customer_id: customer_id,
    messages: [],
  });
  try {
    const dbResponse = await newObj.save();
    res
      .status(200)
      .json({success: true, message: 'added message', data: dbResponse});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
export const getMessageByMechanicId = async id => {
  // const {id} = id;
  try {
    const dbResponse = await Chat_Model.find({Mechanic_id: id})
      .populate('customers')
      .populate('mechanics');
    res.status(200).json({success: true, messages: dbResponse});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
export const getMessageByCustomerId = async (req, res) => {
  const {id} = req.params;
  try {
    const dbResponse = await Chat_Model.find({Customer_id: id})
      .populate('customers')
      .populate('mechanics');
    res.status(200).json({success: true, messages: dbResponse});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

export const updateMessage = async (req, res) => {
  const {id} = req.params;
  try {
    const response = await Chat_Model.updateOne(
      {_id: id},
      {$push: {message: req.body}},
    );
    console.log(response);
    res.status(200).json({success: true, message: 'added service'});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
