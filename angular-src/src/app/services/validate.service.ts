import { Injectable } from "@angular/core";

@Injectable()
export class ValidateService {
  constructor() {}

  validateRegister(patient) {
    if (
      patient.firstName == undefined ||
      patient.lastName == undefined ||
      patient.email == undefined ||
      patient.password == undefined ||
      patient.password2 == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }
  validateVital(vital) {
    if (
      vital.temperature == undefined ||
      vital.heartRate== undefined ||
      vital.bloodPressure == undefined ||
      vital.respiratoryRate == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateProfile(profile) {
    if (
      profile.handle == undefined ||
      profile.gender == undefined ||
      profile.birthday == undefined ||
      profile.blood == undefined ||
      profile.phone == undefined ||
      profile.address == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  confirmPassword(patient) {
    if (patient.password !== patient.password2) {
      return false;
    } else {
      return true;
    }
  }
}
