import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  public busy: boolean = false;
  public form: FormGroup;

  public nameControl = ['', Validators.compose([
    Validators.minLength(3),
    Validators.maxLength(80),
    Validators.required
  ])];

  public documentControl = ['', Validators.compose([
    Validators.minLength(14),
    Validators.maxLength(14),
    Validators.required,
    // CustomValidator.isCpf()
  ])];

  public emailControl = ['', Validators.compose([
    Validators.minLength(5),
    Validators.maxLength(120),
    Validators.required,
    // CustomValidator.EmailValidator
  ])];

  public passwordControl = ['', Validators.compose([
    Validators.minLength(6),
    Validators.maxLength(20),
    Validators.required
  ])];

  constructor(
    private router: Router,
    private dataService: DataService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: this.nameControl,
      document: this.documentControl,
      email: this.emailControl,
      password: this.passwordControl
    });
  }

  ngOnInit(): void {
  }

  submit() {
    this.busy = true;
    this.dataService
      .create(this.form.value)
      .pipe((err: any) => {
        console.error(err);
        this.busy = false;
        this.toastr.error(err);
        return err;
      })
      .subscribe((data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Bem-vindo!');
        this.router.navigate(['/login']);
      });
  }
}
