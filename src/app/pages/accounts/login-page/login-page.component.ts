import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, distinctUntilChanged } from 'rxjs';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';
import { SecurityService } from 'src/app/services/security.service';
import { CustomValidators } from 'src/app/validators/custom.validators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public readonly cpfLenght: number = 11;

  public cpfControl = ['', Validators.compose([
    Validators.minLength(this.cpfLenght),
    Validators.maxLength(this.cpfLenght),
    Validators.required
    //CustomValidators.isCpf
  ])];

  public passwordControl = ['', Validators.compose([
    Validators.minLength(6),
    Validators.maxLength(20),
    Validators.required
  ])];

  public form: FormGroup;
  public busy: boolean = false;


  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private securityService: SecurityService,
    private router: Router
  ) {
    this.form = fb.group({
      cpf: this.cpfControl,
      password: this.passwordControl
    })
  }

  ngOnInit(): void {
    this.loading(() => {
      let token = this.securityService.getToken();
      // setTimeout(() => {
      //   this.busy = false; // Timeout to force load. If remove you want to remove this, set [this.busy] to init as [true].
      // }, 500);
      if (token != null) {
        this.dataService.refreshToken()
          .pipe(
            catchError((err: any) => {
              console.log(err);
              return err;
            })
          )
          .subscribe((data: any) => this.setUserTokenAndRedirect(data['customer'], data['token']));
      }
    });

  }

  submit() {
    let username = this.form.controls['cpf'].value;
    let password = this.form.controls['password'].value

    this.loading(() => {
      this.dataService.authenticate(username, password)
        .pipe(this.returnError)
        .subscribe((data: any) => this.setUserTokenAndRedirect(data['customer'], data['token']));
    })

  }

  private returnError(error: any): any {
    console.error(error);
    return error;
  }

  private setUserTokenAndRedirect(user: User, token: string) {
    this.securityService.setUser(user);
    this.securityService.setToken(token);
    this.router.navigate(['/']);
  }


  private loading(action: VoidFunction) {
    this.busy = true;
    action();
    this.busy = false;
  }
}
