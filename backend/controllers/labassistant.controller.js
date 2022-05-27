const Test = require("../models/test.model");
const TestTypes = require("../models/testtypes.model");

const add_test = (req, res) => {
  const { test, patient, description, result} = req.body;
  console.log(req.body);


    const newTest = new Test({
      test,
      patient,
      description,
      result,
    });
    newTest.save(newTest)
        .then(()=> {
            res.status(200).json({
                newTest,
                message: "test created"
            });
        })
        .catch((error) =>{
            res.status(404).json({
                message: error_message,
            });
        });
    };

function test_delete(req, res) {
    const id = req.params.id;
    Test.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json({
            message: "test deleted",
        });
    });
}

const test_get = (req, res) => {
  const id = req.params.id;
  Test.findById(id)
    .populate({path : 'patient' ,select :'name'})
    .populate({path : 'test' ,select :['testName','normalValues']})
    .then((test) => res.json(test));
};

const test_list = (req, res) => {
  Test.find()
    .populate({path : 'patient' ,select :'name'})
    .populate({path : 'test' ,select :['testName','normalValues']})
    .select("-id")
    .then((test) => {
      res.json(test)
    });
};


const test_update = (req, res, next) => {
  const test = new Test({
    _id: req.params.id,
    test: req.body.test,
    patient: req.body.patient,
    description: req.body.description,
    result: req.body.result
  });
  Test.updateOne({ _id: req.params.id }, test)
    .then((savedTest) => {
      res.status(200).json({
        test,
        message: "one test updated",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

//==================================================================


const add_testType = (req, res) => {
  const { testName, description, normalValues, available } = req.body;
  console.log(req.body);


    const newTestType = new TestTypes({
      testName,
      description,
      normalValues,
      available,
    });
    newTestType.save(newTestType)
        .then(()=> {
            res.status(200).json({
                newTestType,
                message: "test type created"
            });
        })
        .catch((error) =>{
            res.status(404).json({
                message: error,
            });
        });
    };

function testType_delete(req, res) {
    const id = req.params.id;
    TestTypes.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json({
            message: "test type deleted",
        });
    });
}

const testType_get = (req, res) => {
  const id = req.params.id;
  TestTypes.findById(id)
    .then((testtype) => res.json(testtype));
};

const testType_list = (req, res) => {
  TestTypes.find()
    .select("-id")
    .then((testtype) => {
      res.json(testtype)
    });
};


const testType_update = (req, res, next) => {
  console.log(req.body.available);
  const testtype = new TestTypes({
    _id: req.params.id,
    testName: req.body.testName,
    description: req.body.description,
    normalValues: req.body.normalValues,
    available: req.body.available
  });
  TestTypes.updateOne({ _id: req.params.id }, testtype)
    .then((savedTest) => {
      res.status(200).json({
        testtype,
        message: "one test updated",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};


module.exports = {
  add_test,
  test_delete,
  test_get,
  test_list,
  test_delete,
  test_update,
  add_testType,
  testType_delete,
  testType_get,
  testType_list,
  testType_delete,
  testType_update
};
