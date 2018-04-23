import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { ValidateService } from "./../../services/validate.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  profile: Object;
  exist: String;

  handle: String;
  gender: String;
  history: String;
  blood: String;
  birthday: Date;
  address: String;
  phone: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(
      profile => {
        this.profile = profile;
        if (profile.handle) {
          this.exist = profile.handle;
        }
        if (profile.noprofile) {
          this.flashMessage.show("Please create the profile", {
            cssClass: "alert-danger",
            timeout: 3000
          });
        }
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

  onProfileSubmit() {
    const profile = {
      handle: this.handle,
      gender: this.gender,
      history: this.history,
      blood: this.blood,
      birthday: this.birthday,
      address: this.address,
      phone: this.phone
    };
    if (!this.validateService.validateProfile(profile)) {
      this.flashMessage.show("Please fill in all required fields", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }
    this.authService.registerProfile(profile).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("Your profile created", {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate(["/dashboard"]);
      } else {
        console.log(data);
        console.log(data.errors);
        this.flashMessage.show(data.errors, {
          cssClass: "alert-danger",
          timeout: 3000
        });
        this.router.navigate(["/profile"]);
      }
    });
  }
}
