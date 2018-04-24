const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateVitalInput(data) {
  let errors = {};

  data.temperature = !isEmpty(data.temperature) ? data.temperature : "";
  data.heartRate = !isEmpty(data.heartRate) ? data.heartRate : "";
  data.bloodPressure = !isEmpty(data.bloodPressure) ? data.bloodPressure : "";
  data.respiratoryRate = !isEmpty(data.respiratoryRate)
    ? data.respiratoryRate
    : "";

  if (Validator.isEmpty(data.temperature)) {
    errors.temperature = "Body temperature field is required";
  }
  if (!Validator.isNumeric(data.temperature)) {
    errors.numeric = "All fields should be numeric";
  }
  if (Validator.isEmpty(data.heartRate)) {
    errors.heartRate = "Heart rate field is required";
  }
  if (!Validator.isNumeric(data.heartRate)) {
    errors.numeric = "All fields should be numeric";
  }
  if (Validator.isEmpty(data.bloodPressure)) {
    errors.bloodPressure = "Blood pressure field is required";
  }
  if (!Validator.isNumeric(data.bloodPressure)) {
    errors.numeric = "All fields should be numeric";
  }
  if (Validator.isEmpty(data.respiratoryRate)) {
    errors.respiratoryRate = "Respiratory rate field is required";
  }
  if (!Validator.isNumeric(data.respiratoryRate)) {
    errors.numeric = "All fields should be numeric";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
