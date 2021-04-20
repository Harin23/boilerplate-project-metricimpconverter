const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Numerical Input', function(){
    test('whole number', ()=>{
      var input = "5";
      var output = convertHandler.getNum(input);
      assert.equal(input, output, "Error: Cannot read whole number")
    });
    test('Decimal number', ()=>{
      var input = "5.5";
      var output = convertHandler.getNum(input);
      assert.equal(input, output, "Error: Cannot read decimal number")
    })
    test('fraction number', ()=>{
      var input = "5/6";
      var output = convertHandler.getNum(input);
      assert.equal(eval(input), output, "Error: Cannot read fraction number")
    })
    test('fraction and decimal number', ()=>{
      var input = "2.5/5";
      var output = convertHandler.getNum(input);
      assert.equal(eval(input), output, "Error: Cannot read fraction and decimal number")
    })
    test('double fraction', ()=>{
      var input = "5/6/4";
      var output = convertHandler.getNum(input);
      assert.isUndefined(output, "Error: Should not read double fraction")
    })
    test('No input for number', ()=>{
      var input = "";
      var output = convertHandler.getNum(input);
      assert.equal(output, "1", "Error: No input for number should result in 1")
    })
  });
  suite('Unit Input', function(){
    test('valid unit inputs', ()=>{
      var inputs = ["l", "kg", "km", "gal", "lbs", "mi"];
      var output=[];
      inputs.forEach((cv, i, arr)=>{
        output[i] = convertHandler.getUnit(cv);
      })
      assert.notStrictEqual(output, ["L", "kg", "km", "gal", "lbs", "mi"], "Error: Cannot read valid unit")
    });
    test('invalid unit input', ()=>{
      var input = "minutes";
      var output = convertHandler.getUnit(input);
      assert.isUndefined(output, "Error: invalid unit input")
    })
    test('return unit', ()=>{
      var inputs = ["l", "kg", "km", "gal", "lbs", "mi"];
      var output=[];
      inputs.forEach((cv, i)=>{
        output[i] = convertHandler.getReturnUnit(cv);
      })
      assert.notStrictEqual(output, ["gal", "lbs", "mi", "L", "kg", "km"], "Error: does not return correct unit")
    });
    test('return spelled out unit', ()=>{
      var inputs = ["l", "kg", "km", "gal", "lbs", "mi"];
      var output=[];
      inputs.forEach((cv, i)=>{
        output[i] = convertHandler.spellOutUnit(cv);
      })
      assert.notStrictEqual(output, ["litres", "kilograms", "kilometers", "gallons", "pounds", "miles"], "Error: does not return correct unit")
    });
  });
  suite('convert', ()=>{
    test('gal to L', ()=>{
      num = 1/3.78541;
      unit = 'gal';
      assert.equal(convertHandler.convert(num, unit), "1", "Conversion Error: gal to L")
    })
    test('L to gal', ()=>{
      num = 3.78541;
      unit = 'l';
      assert.equal(convertHandler.convert(num, unit), "1", "Conversion Error: L to gal")
    })
    test('mi to km', ()=>{
      num = 1/1.60934;
      unit = "mi";
      assert.equal(convertHandler.convert(num, unit), "1", "Conversion Error: mi to km")
    })
    test('km to mi', ()=>{
      num = 1.60934;
      unit = "km";
      assert.equal(convertHandler.convert(num, unit), "1", "Conversion Error: km to mi")
    })
    test('lbs to kg', ()=>{
      num = 1/0.453592;
      unit = "lbs";
      assert.equal(convertHandler.convert(num, unit), "1", "Conversion Error: lbs to kg")
    })
    test('kg to lbs', ()=>{
      num = 0.453592;
      unit = "kg";
      assert.equal(convertHandler.convert(num, unit), "1", "Conversion Error: kg to lbs")
    })
  })
});