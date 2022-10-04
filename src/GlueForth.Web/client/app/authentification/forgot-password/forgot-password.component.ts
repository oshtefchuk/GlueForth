import { Component, OnInit } from '@angular/core';
import { ForgotPasswordInfo, ForgotPasswordService } from './forgot-password.service';
import { FormValidation } from "../../shared/models/form-validation.model";
import { UserService } from "../../shared/services/user.service";


@Component({
  selector: 'bluenorth-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassword: ForgotPasswordInfo;

  emailPattern: any = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(private forgotPasswordService: ForgotPasswordService,
              private userService: UserService) {
    this.emailPattern = FormValidation.prototype.getEmailPattern();
  }

  ngOnInit() {
    this.forgotPassword = this.forgotPasswordService.getForgotPassword();
  }

  public postForgotPassword(e) {
    this.forgotPasswordService.postEmailForgotPassword(this.forgotPassword.email)
      .subscribe(response => {
          this.userService.showUserNotification(
            `We sent you an email with a password reset link to ${this.forgotPassword.email}
            . Please check your inbox (or' spam folder if we are not added to your safe senders list).`,
            'success',
            100000);
      },
        error => this.userService.showUserNotification(error.error.Message, 'error', 10000));
    e.preventDefault();
  }
}

