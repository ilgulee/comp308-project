import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {}

  onLoginSubmit() {
    const patient = {
      email: this.email,
      password: this.password
    };

    this.authService.authenticatePatient(patient).subscribe(data => {
      if (data.success) {
        this.authService.storePatientData(data.token);
        this.flashMessage.show("You are now logged in", {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate(["/dashboard"]);
      } else {
        this.flashMessage.show((data.email!=undefined?data.email:"")+" "+(data.password!=undefined?data.password:""), {
          cssClass: "alert-danger",
          timeout: 3000
        });
        this.router.navigate(["/login"]);
      }
    });
  }
}
