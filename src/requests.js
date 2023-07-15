


/**
 * update db
 * send to bot users id socker
 *  senf notifivcation
 * 
 * 
 */

const { client } = require("./cron");
const { admin } = require("./firebase");
const { ObjectId } = require('mongodb');



const requests = async (arg)=>{
    const {rider,details,driver} = arg
   console.log(driver.device)
    try {
        await client.connect()
        const db = client.db('rides');   
        const requests = db.collection('requests');
        const result = await requests.insertOne({
            ...arg,
            status: 'waiting' 
        })
        const insertedId = result.insertedId;

        await admin.messaging().send({
            token: driver.device,
            data: {
                type:'requests',
                id:insertedId.toString(),
                rider:rider,
                details:details
            },
        })
        return insertedId.toString();;
    }catch (error) {
        console.log(error)
    }


}






const accepted = async (rideId) =>{
    // updat 
    // send use notificataion
    try {
        await client.connect()
        const db = client.db('rides');   
        const requests = db.collection('requests');
        const updateData = {
            status:'accepted'
        }
        const result = await requests.updateOne(
            { _id: ObjectId(rideId) },
            { $set: updateData }
          );
            console.log('updated')
          //send notify to rider
    } catch (error) {
        console.log(error)
    }
    
  
}

module.exports ={
    requests,
    accepted
}