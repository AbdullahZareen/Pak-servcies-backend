import Chat from '../model/chat.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
// export const InsertMessage = async (
//   mechanic_id,
//   customer_id,
//   message,
//   senderName,
// ) => {
//   const newObj = Chat({
//     Mechanic_id: mechanic_id,
//     Customer_id: customer_id,
//     messages: {text: message, sender: senderName, timeStamp: new Date()},
//   });
//   try {
//     const isExist = await Chat.find({
//       Mechanic_id: mechanic_id,
//       Customer_id: customer_id,
//     });
//     if (isExist && isExist.length > 0) {
//       const updateResponse = await Chat.updateOne(
//         {
//           Mechanic_id: mechanic_id,
//           Customer_id: customer_id,
//         },
//         {
//           $push: {
//             messages: {
//               text: message,
//               sender: senderName,
//               timeStamp: new Date(),
//             },
//           },
//         },
//       );
//       console.log('message is saving');
//       console.log(updateResponse);
//     } else {
//       const dbResponse = await newObj.save();
//       console.log('chat is creating');
//       console.log(dbResponse);
//     }
//   } catch (error) {
//     console.log('could not save message due to this error:', error.message);
//     return {success: false, message: error.message};
//   }
// };

export const getMessageByMechanicId = async id => {
  try {
    const dbResponse = await Chat.aggregate([
      {
        $lookup: {
          from: 'customers',
          localField: 'Customer_id',
          foreignField: '_id',
          as: 'CustomerInfo',
        },
      },
      {$match: {Mechanic_id: ObjectId(id)}},
      // {$match: {}},
      // {$group: {Customer_id: '6309f7af30d01894d0c14aeb'}},
    ]);

    return {response: dbResponse};
  } catch (error) {
    console.log(
      'could not get messages bu mechanic due to this error:',
      error.message,
    );
    return {success: false, message: error.message};
  }
};
export const getMessageByCustomerId = async id => {
  try {
    const dbResponse = await Chat.aggregate([
      {
        $lookup: {
          from: 'mechanics',
          localField: 'Mechanic_id',
          foreignField: '_id',
          as: 'MechanicInfo',
        },
      },
      {$match: {Customer_id: ObjectId(id)}},
      // {$match: {}},
      // {$group: {Customer_id: '6309f7af30d01894d0c14aeb'}},
    ]);
    // console.log(dbResponse);
    return {response: dbResponse};
  } catch (error) {
    console.log(
      'could not get messages bu customer due to this error:',
      error.message,
    );
    return {success: false, message: error.mrsessage};
  }
};

//////
export const InsertChat = async (mechanic_id, customer_id) => {
  const newObj = Chat({
    Mechanic_id: mechanic_id,
    Customer_id: customer_id,
  });
  try {
    const isExist = await Chat.aggregate([
      {
        $lookup: {
          from: 'customers',
          localField: 'Customer_id',
          foreignField: '_id',
          as: 'CustomerInfo',
        },
      },
      {
        $match: {
          Mechanic_id: ObjectId(mechanic_id),
          Customer_id: ObjectId(customer_id),
        },
      },
    ]);
    const data = isExist;
    // console.log('Chat data+++++++++++', data);

    if (isExist && isExist.length > 0) {
      return ['chat already exist_________', data];
    } else {
      const dbResponse = await newObj.save();
      console.log('db response', dbResponse);
      const agg = await Chat.aggregate([
        {
          $lookup: {
            from: 'customers',
            localField: 'Customer_id',
            foreignField: '_id',
            as: 'CustomerInfo',
          },
        },
        {$match: {_id: ObjectId(dbResponse._id)}},
      ]);
      console.log('chat is creating++++++++++', agg);
      return ['chat saved', agg];
    }
  } catch (error) {
    console.log('could not save message due to this error:', error.message);
    return {success: false, message: error.message};
  }
};

export const getMessageByID = async id => {
  // const {id} = id;
  try {
    const dbResponse = await Chat.find({_id: id});
    // .populate('customers')
    // .populate('mechanics');
    // res.status(200).json({success: true, messages: dbResponse});
    return dbResponse[0].messages;
  } catch (error) {
    // res.status(500).json({success: false, message: error.message});
    return error;
  }
};

export const InsertMessage = async (id, message, senderName) => {
  const updateResponse = await Chat.updateOne(
    {
      _id: id,
    },
    {
      $push: {
        messages: {
          text: message,
          sender: senderName,
          timeStamp: new Date(),
        },
      },
    },
    {
      new: true,
    },
  );
  if (updateResponse.modifiedCount === 1) {
    const updateData = await Chat.find({_id: id});
    console.log('message is saving');

    const index = updateData[0].messages.length;
    return updateData[0].messages[index - 1];
  }
};
