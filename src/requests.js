


/**
 * update db
 * send to bot users id socker
 *  senf notifivcation
 * 
 * 
 */

const { client } = require("./cron");
const { admin } = require("./firebase");



const requests = async (arg)=>{
    const {rider,details,driver} = arg

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
            notifee: JSON.stringify({
            body: {message:'This message was sent via FCM!',ID:insertedId},
            android: {
                channelId: 'default',
                actions: [
                {
                    title: 'Mark as Read',
                    pressAction: {
                    id: 'read',
                    },
                },
                ],
            },
            }),
        },
        })
        return insertedId;
    }catch (error) {
        console.log(error)
    }


}


module.exports ={
    requests
}