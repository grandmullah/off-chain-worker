


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
            data: {data:JSON.stringify({
                type:'requests',
                id:insertedId.toString(),
                rider:rider,
                details:details
            })},
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
        const details = await  requests.findOne( { _id: new ObjectId(rideId) })
        console.log(details)
        const result = await requests.updateOne(
            { _id: new ObjectId(rideId) },
            { $set: updateData }
        );

        await admin.messaging().send({
            token: details.rider.token,
            data: {data:JSON.stringify({
                type:'accepted',
                id:rideId,
                driver:details.driver
            })},
        })
            console.log('updated')
          //send notify to rider
    } catch (error) {
        console.log(error)
    }
    
  
}


const arrived = async (rideId) =>{
    // updat 
    // send use notificataion
    try {
        await client.connect()
        const db = client.db('rides');   
        const requests = db.collection('requests');
        const updateData = {
            status:'arrived'
        }
        const details = await  requests.findOne( { _id: new ObjectId(rideId) })
        console.log(details)
        const result = await requests.updateOne(
            { _id: new ObjectId(rideId) },
            { $set: updateData }
        );

        await admin.messaging().send({
            token: details.rider.token,
            data: {data:JSON.stringify({
                type:'arrived',
                id:rideId,
                driver:details.driver
            })},
        })
            console.log('updated')
          //send notify to rider
    } catch (error) {
        console.log(error)
    }
    
  
}

const started = async (rideId) =>{
    // updat 
    // send use notificataion
    try {
        await client.connect()
        const db = client.db('rides');   
        const requests = db.collection('requests');
        const updateData = {
            status:'started'
        }
        const details = await  requests.findOne( { _id: new ObjectId(rideId) })
        console.log(details)
        const result = await requests.updateOne(
            { _id: new ObjectId(rideId) },
            { $set: updateData }
        );

        await admin.messaging().send({
            token: details.rider.token,
            data: {data:JSON.stringify({
                type:'started',
                id:rideId,
                driver:details.driver
            })},
        })
            console.log('updated')
          //send notify to rider
    } catch (error) {
        console.log(error)
    }
    
  
}
const completed = async (rideId) =>{
    // updat 
    // send use notificataion
    try {
        await client.connect()
        const db = client.db('rides');   
        const requests = db.collection('requests');
        const updateData = {
            status:'completed'
        }
        const details = await  requests.findOne( { _id: new ObjectId(rideId) })
        console.log(details)
        const result = await requests.updateOne(
            { _id: new ObjectId(rideId) },
            { $set: updateData }
        );

        await admin.messaging().send({
            token: details.rider.token,
            data: {data:JSON.stringify({
                type:'completed',
                id:rideId,
                driver:details.driver
            })},
        })
            console.log('updated')
          //send notify to rider
    } catch (error) {
        console.log(error)
    }
    
  
}

module.exports ={
    requests,
    accepted,
    arrived,
    started,
    completed
}