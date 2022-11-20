import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  public form: FormGroup;
  public busy: boolean = false;

  public nameControl = ['', Validators.compose([
    Validators.minLength(3),
    Validators.maxLength(80),
    Validators.required
  ])];

  public documentControl = [{ value: '', disabled: true }];

  public emailControl = ['', Validators.compose([
    Validators.minLength(5),
    Validators.maxLength(120),
    Validators.required
  ])];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.busy = true;
    this.dataService
      .getProfile()
      .pipe(
        catchError(
          (err: any) => {
            console.log(err);
            this.toastr.error(err);
            this.busy = false;
            return err;
          }
        )
      )
      .subscribe(
        (data: any) => {
          this.form.controls['name'].setValue(data.name);
          this.form.controls['document'].setValue(data.document);
          this.form.controls['email'].setValue(data.email);
        }
      )
  }

  submit() {
    this.busy = true;
    this.dataService
      .updateProfile(this.form.value)
      .pipe(
        catchError(
          (err: any) => {
            console.log(err);
            this.toastr.error(err);
            this.busy = false;
            return err;
          }
        )
      )
      .subscribe(
        (data: any) => {
          this.busy = false;
          this.toastr.success(data.message, 'Atualização Completa!');
        }
      )
  }
}
