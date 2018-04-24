import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { ValidateService } from "./../../services/validate.service";

@Component({
  selector: "app-vital",
  templateUrl: "./vital.component.html",
  styleUrls: ["./vital.component.css"]
})
export class VitalComponent implements OnInit {
  temperature:String;
  heartRate:String;
  bloodPressure:String;
  respiratoryRate:String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onVitalSubmit(){
    const vital = {
      temperature: this.temperature,
      heartRate: this.heartRate,
      bloodPressure: this.bloodPressure,
      respiratoryRate: this.respiratoryRate
    };
    if (!this.validateService.validateVital(vital)) {
      this.flashMessage.show("Please fill in all required fields", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }
    this.authService.registerVital(vital).subscribe(data => {
      if (data.success) {
        this.flashMessage.show("Vital recorded", {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate(["dashboard"]);
      } else {
        console.log(data);

        this.flashMessage.show(data.numeric, {
          cssClass: "alert-danger",
          timeout: 3000
        });
        this.router.navigate(["vital"]);
      }
    });
  }
}
