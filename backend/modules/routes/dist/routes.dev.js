"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/task.controllers'),
    getAllCosts = _require.getAllCosts,
    createNewCost = _require.createNewCost,
    changeCost = _require.changeCost,
    deleteCost = _require.deleteCost;

router.get('/allCosts', getAllCosts);
router.post('/createCost', createNewCost);
router.patch('/changeCost', changeCost);
router["delete"]('/deleteCost', deleteCost);
module.exports = router;