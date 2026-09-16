import { Component, OnInit } from '@angular/core';
import { LocalStoreService } from 'app/core/data/local/local-store.service';
import { baseAnimations } from 'app/core/screen/animations/animations.util';
import { AuthService } from 'app/system/session/authentication/auth.service';
import { system_keys } from 'app/system/system-keys.config';
import * as uuid from 'uuid';
import { printLog } from 'app/core/shared/debug.util';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: baseAnimations
})
export class SigninComponent implements OnInit {

  //signupForm: FormGroup;

  constructor(
    //private fb: FormBuilder
    private authService: AuthService,
    private lsService: LocalStoreService
  ) {
    this.authService.configure();
   }

  ngOnInit() {

    /*const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.signupForm = this.fb.group(
      {
        email: ["",[Validators.required,Validators.email]],
        password: password,
        agreed: [false,Validators.required]
      }
    );*/
    this.lsService.clear();
    this.authService.logout();
    const myId = uuid.v4();
    this.lsService.setItem(system_keys.session_id,myId);
    printLog("Generate Local Session ID: "+myId);
  }

  /*onSubmit() {
    if (!this.signupForm.invalid) {
      // do what you wnat with your data
      //console.log(this.signupForm.value);
    }
  }*/

  onSignin(){
    this.lsService.setItem(system_keys.act_lp,true);
    
    this.authService.login();
  }

}
