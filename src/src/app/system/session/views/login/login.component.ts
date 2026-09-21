import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/system/session/authentication/auth.service";
import { LoginService } from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,private login:LoginService) {}

  ngOnInit() {
    this.authService.runInitialLoginSequence()
      //.then(() => new Promise<void>(resolve => setTimeout(() => resolve(), 150)))
      .then(() => {
        //console.log(this.userService.getEmail());
        this.login.onLogin()
      });
  }

}