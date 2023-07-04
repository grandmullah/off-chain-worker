const express = require('express')
const { requestRide } = require('../src/service')
const { updateLocation } = require('../src/update_location')
const { exist } = require('../src/existence')
const router = express.Router()

router.post('/request_ride',requestRide)
router.post('/driver-location',updateLocation)
router.get('/check',exist)
  

module.exports = router