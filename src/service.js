const { client } = require('./cron');
const {admin} = require('./firebase')
const  db = admin.database();



const requestRide = async (req,res) => {

    /**
     * creaet tx 
     * upadte location 
     *  update destination and pickup  add tx 
     * get  drivers 
     * retrun  vailble riders 
     */
    try {
      console.log(req.body)
      const { longitude, latitude } = req.body;
      await client.connect() 
      const db = client.db('location');   
      
      // Connect to the MongoDB server
      
  
      // Access the drivers collection
      const drivers = db.collection('drivers');

      const nearbyDrivers = await drivers.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(longitude), parseFloat(latitude)]
            },
            $maxDistance: 5000 // in meters
          }
        },
        lastUpdated: {
          $gte: new Date(Date.now() - 20 * 60 * 1000) // 20 minutes ago
        }
      }).toArray();
  
      // Calculate estimated time to arrive at the pickup point based on speed
      nearbyDrivers.forEach(driver => {
        const distance = calculateDistance(driver.location.coordinates[1], driver.location.coordinates[0], parseFloat(latitude), parseFloat(longitude));
        const estimatedTime = distance / driver.speed; // Assuming driver's speed is in meters per minute
        driver.estimatedTime = estimatedTime;
      });
  
      res.json(nearbyDrivers);
    
    // console.log(g)
  
      // // Query the drivers within a certain radius (e.g., 5 kilometers)
      // const nearbyDrivers = await drivers.find({
      //   location: {
      //     $near: {
      //       $geometry: {
      //         type: 'Point',
      //         coordinates: [longitude, latitude]
      //       },
      //       $maxDistance: 5000 // in meters
      //     }
      //   }
      // }).toArray();
     console.log(nearbyDrivers)
      res.json(nearbyDrivers);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }

// API endpoint to find the best pickup cab for a specific request

// Function to find the best pickup cab for a specific request



}

module.exports = {
    requestRide
}
//erase lucky memory ivory shiver position bleak will scrub unlock quantum direct
// const calc =  (loc,item) =>{
   
      
//   const origin1 = `${loc.latitude},${loc.longitude}`;
//   const destination1 = `${item.latitude},${item.longitude}`;
//   console.log('hapa',origin1,destination1)
//   return axios.get(
//     `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin1}&mode=driving&destinations=${destination1}&key=${API_MAP_KEY}`
//   ).then((resp)=>{
//     // console.log(resp.data)
//     if(resp.data.status === 'OK'){
//       return resp.data.rows[0].elements[0].duration.text
//     }
//   }).catch((error)=>{
//     console.log('error' ,error)
//   })

// }


// function findBestMatch(seekerRequest) {
//   let bestMatch = null;
//   let bestMatchScore = -1;

//   for (const provider of providers) {
//     // Apply your matching algorithm here
//     // For example, calculate a score based on distance and preferences
//     const distance = calculateDistance(provider.location, seekerRequest.location);

//     // Check if preferences match and calculate a score based on criteria
//     const preferencesMatch = provider.preferences.some((pref) =>
//       seekerRequest.preferences.includes(pref)
//     );

//     // Calculate a score based on distance and preference match
//     const score = preferencesMatch ? 100 / (distance + 1) : 0;

//     // Update the best match if the current score is higher
//     if (score > bestMatchScore) {
//       bestMatch = provider;
//       bestMatchScore = score;
//     }
//   }

//   return bestMatch;
// }

// function calculateDistance(lat1, lon1, lat2, lon2) {
//   const earthRadius = 6371; // in kilometers

//   // Convert latitude and longitude from degrees to radians
//   const lat1Rad = toRadians(lat1);
//   const lon1Rad = toRadians(lon1);
//   const lat2Rad = toRadians(lat2);
//   const lon2Rad = toRadians(lon2);

//   // Difference between the latitudes and longitudes
//   const dLat = lat2Rad - lat1Rad;
//   const dLon = lon2Rad - lon1Rad;

//   // Haversine formula
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = earthRadius * c;

//   return distance;
// }

// // Function to convert degrees to radians
// function toRadians(degrees) {
//   return (degrees * Math.PI) / 180;
// }




// async function findNearbyDrivers(userLocation) {
//   const driversRef = db.ref('drivers');

//   // Fetch all drivers from the Realtime Database
//   const snapshot = await driversRef.once('value');
//   const drivers = snapshot.val();

//   // Filter drivers based on distance from user's location
//   const nearbyDrivers = Object.values(drivers).filter(driver => {
//     const driverLocation = driver.location;
//     const distance = calculateDistance(
//       userLocation.latitude,
//       userLocation.longitude,
//       driverLocation.latitude,
//       driverLocation.longitude
//     );
//     const maxDistance = 5000; // 5 kilometers
//     return distance <= maxDistance;
//   });

//   return nearbyDrivers;
// }
