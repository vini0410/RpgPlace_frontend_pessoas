import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { PessoaSessionService } from '../session/pessoaSession.service';
import { User } from '../class/user.model';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class LoginComponent {
  @Input()
  email!: string;

  @Input()
  password!: string;

  constructor(private pessoaSession: PessoaSessionService) {}
  login() {
    const user = this.buildUser();
    this.pessoaSession.loginUser(user);
  }
  private buildUser(): User {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
