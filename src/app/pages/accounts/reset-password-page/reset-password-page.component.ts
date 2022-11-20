import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit {

  public busy: boolean = false;
  public form: FormGroup;

  public documentControl = ['', Validators.compose([
    Validators.maxLength(11),
    Validators.minLength(11),
    Validators.required
  ])]

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = fb.group({
      'document': this.documentControl
    })
  }

  ngOnInit(): void {
  }

  submit() {
    this.busy = true;
    this.dataService
      .resetPassword(this.form.controls['document'].value)
      .pipe(
        catchError((err: any) => {
          console.error(err);
          this.toastr.error(err);
          this.busy = false;
          return err;
        })
      )
      .subscribe((data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Senha restaurada.');
        this.router.navigate(['/login']);
      })
  }
}
