const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.birthday = !isEmpty(data.birthday) ? data.birthday : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.blood = !isEmpty(data.blood) ? data.blood : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to between 2 and 4 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle name is required";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  if (Validator.isEmpty(data.birthday)) {
    errors.birthday = "Birthday field is required";
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required";
  }

  if (Validator.isEmpty(data.blood)) {
    errors.blood = "Blood type field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
