"use strict";

var Cost = require('../../db/models/index');

module.exports.getAllCosts = function (req, res, next) {
  Cost.find().then(function (result) {
    res.send({
      data: result
    });
  });
};

module.exports.createNewCost = function (req, res, next) {
  var cost = new Cost(req.body);
  cost.save().then(function () {
    Cost.find().then(function (result) {
      res.send({
        data: result
      });
    });
  });
};

module.exports.changeCost = function (req, res, next) {
  Cost.updateOne({
    _id: req.body._id
  }, req.body).then(function (result) {
    Cost.find().then(function (result) {
      res.send({
        data: result
      });
    });
  });
};

module.exports.deleteCost = function (req, res, next) {
  Cost.deleteOne({
    _id: req.query.id
  }).then(function (result) {
    Cost.find().then(function (result) {
      res.send({
        data: result
      });
    });
  });
};