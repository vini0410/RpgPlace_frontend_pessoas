import { IntegracaoService } from '../pessoa/integracao.service';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { PessoaSessionService } from '../session/pessoaSession.service';
import { User } from '../class/user.model';
import { Router } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
})
export class RegisterComponent {
  @Input()
  name!: string;

  @Input()
  email!: string;

  @Input()
  password!: string;

  constructor(
    private pessoaSession: PessoaSessionService,
    private integracaoService: IntegracaoService,
    private router: Router
  ) {}

  register() {
    const user = this.buildUser();
    console.log(user);
    this.pessoaSession.registerUser(user).subscribe(() => {
      this.integracaoService.showMessage('Usuario criado com sucesso')
    });
    this.router.navigate(['/login']);
  }
  buildUser(): User {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }
}
