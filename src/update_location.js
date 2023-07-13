const {admin} = require('./firebase')
const  db = admin.database();
const {client} = require('./cron')


const updateLocation = async  (data) => {

   
    
    const {id,location}= data
    // console.log(id,location)

    try {
        await client.connect() 
        const db = client.db('location');   
        const drivers = db.collection('drivers');
        console.log(id,location)

    // Create a new driver document
    const newDriver = {
      driver:id,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
      },
      speed:location.speed
    };

    const jj = drivers.find({driver:id} )
  
const b = (await jj.toArray()).length
 console.log('her',(await jj.toArray()))
    if(b>0){
      console.log('exec, her1 ')
    drivers.updateOne({driver:id},{
        $set:{
          location: {
            type: 'Point',
            coordinates: [location.longitude, location.latitude]
          },
          speed:location.speed
        },
        
        $currentDate: { lastUpdated: true }
      })
   }else{
    console.log('exec, her2 ')
     await drivers.insertOne (newDriver)
   }

   drivers.createIndex( { location: "2dsphere" } )
    
    } catch (error) {
        console.log(error)
        
    }
}
module.exports ={
    updateLocation
}