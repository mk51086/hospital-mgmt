const Test = require("../models/test.model");

const add_test = (req, res) => {
  const { testName, patient, description, result, normal } = req.body;
  console.log(req.body);


    const newTest = new Test({
      testName,
      patient,
      description,
      result,
      normal,
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

// Delete test
function test_delete(req, res) {
    const id = req.params.id;
    Test.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json({
            message: "test deleted",
        });
    });
}

// Get test by ID
const test_get = (req, res) => {
  const id = req.params.id;
  Test.findById(id)
    .populate({path : 'patient' ,select :'name'})
    .then((test) => res.json(test));
};

// Get all tests
const test_list = (req, res) => {
  Test.find()
    .populate({path : 'patient' ,select :'name'})
    .select("-id")
    .then((test) => {
      res.json(test)
    });
};


// Update a test by ID
const test_update = (req, res, next) => {
  const test = new Test({
    _id: req.params.id,
    testName: req.body.testName,
    patient: req.body.patient,
    description: req.body.description,
    result: req.body.result,
    normal: req.body.normal
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

module.exports = {
  add_test,
  test_delete,
  test_get,
  test_list,
  test_delete,
  test_update
};
