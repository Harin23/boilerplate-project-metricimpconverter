'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res)=>{
    var input = req.query.input;
    // console.log(input)
    var initNum = convertHandler.getNum(input);
    var initUnit = convertHandler.getUnit(input);
    if(initUnit==undefined && initNum==undefined){
      // console.log('invalid number and unit\n')
      res.send('invalid number and unit');
    }else if(initNum==undefined){
      // console.log('invalid number\n')
      res.send('invalid number');
    }else if(initUnit==undefined){
      // console.log('invalid unit\n')
      res.send('invalid unit');
    }else{
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      // console.log(string)
      // console.log({initNum, initUnit, returnNum, returnUnit, string},"\n")
      res.json({initNum, initUnit,  returnNum, returnUnit, string});
    }
  });

};
