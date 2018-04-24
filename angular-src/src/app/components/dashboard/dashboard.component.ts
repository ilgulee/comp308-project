import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { ValidateService } from "./../../services/validate.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  reason: String;
  handle:String;
  profile:Object;
  exist:String;
  alerts:any[];
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
          this.handle=profile.handle;
          this.alerts=profile.alerts;
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

  onAlertSend(){
    const alert={
      reason:this.reason
    }
    this.authService.registerAlert(alert).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("Emergency alert sent", {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate([""]);
      } else {
        this.flashMessage.show("Something went wrong", {
          cssClass: "alert-danger",
          timeout: 3000
        });
        this.router.navigate(["dashboard"]);
      }
    });
  }
}
