const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateVitalInput(data) {
  let errors = {};

  data.temperature = !isEmpty(data.temperature) ? data.temperature : "";
  data.heartRate = !isEmpty(data.heartRate) ? data.heartRate : "";
  data.bloodPressure = !isEmpty(data.bloodPressure) ? data.bloodPressure : "";
  data.respiratoryRate = !isEmpty(data.respiratoryRate) ? data.respiratoryRate : "";
  
  if (Validator.isEmpty(data.temperature)) {
    errors.temperature = "Body temperature field is required";
  }
  if (Validator.isEmpty(data.heartRate)) {
    errors.heartRate = "Heart rate field is required";
  }
  if (Validator.isEmpty(data.bloodPressure)) {
    errors.bloodPressure = "Blood pressure field is required";
  }
  if (Validator.isEmpty(data.respiratoryRate)) {
    errors.respiratoryRate = "Respiratory rate field is required";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
