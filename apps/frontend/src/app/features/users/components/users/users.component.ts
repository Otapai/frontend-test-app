import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersInterface } from '../../interfaces/users.interface';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbar } from '@angular/material/toolbar';
import { UUID } from 'angular2-uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButton,
    MatToolbar,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnChanges {
  form: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    active: [true, [Validators.required]],
  });

  @Input() user!: UsersInterface | null;
  @Input() edit!: boolean;
  @Output() submitEvent = new EventEmitter<UsersInterface>();

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'].currentValue) {
      this.form.setValue(changes['user'].currentValue);
    }
  }

  onSubmit(): void {
    if (!this.edit) {
      this.form.patchValue({ id: UUID.UUID() });
    }
    if (this.form.valid) {
      this.submitEvent.emit(this.form.value as UsersInterface);
    }
  }

  onBack(): void {
    this.router.navigate(['', 'users']).then();
  }
}
