import { Component, OnInit } from "@angular/core";
import { ValidateService } from "./../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  email: String;
  firstName: String;
  lastName: String;
  password: String;
  password2: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onRegisterSubmit() {
    const patient = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      password2: this.password2
    };
    if (!this.validateService.validateRegister(patient)) {
      this.flashMessage.show("Please fill in all fields", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }
    if (!this.validateService.validateEmail(patient.email)) {
      this.flashMessage.show("Please use a valid email", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }
    if (!this.validateService.confirmPassword(patient)) {
      this.flashMessage.show("Please confirm password", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }
    this.authService.registerPatient(patient).subscribe(data => {

      if (data.success) {
        this.flashMessage.show("You are now registered and can log in", {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate(["/login"]);
      } else {
        this.flashMessage.show(data.email, {
          cssClass: "alert-danger",
          timeout: 3000
        });
        this.router.navigate(["/register"]);
      }
    });

  }
}
