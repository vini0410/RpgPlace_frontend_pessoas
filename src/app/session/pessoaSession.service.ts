import { Injectable } from '@angular/core';
import { IntegracaoService } from '../pessoa/integracao.service';
import { User } from '../class/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PessoaSessionService {
  constructor(private service: IntegracaoService, private router: Router) {}

  saveUser(user: User) {
    sessionStorage.setItem('user_id', user.id!.toString());
    sessionStorage.setItem('user_name', user.name!);
    sessionStorage.setItem('user_logged', 'true');
  }

  registerUser(newUser: User) {
    return this.service.insertUser(newUser);
  }

  loginUser(u: User) {
    this.service.getByEmail(u.email!).subscribe((user) => {
      const valid = this.validate(u, user);
      if (valid) {
        this.saveUser(user);
        this.router.navigate(['/game']);
      } else {
        this.service.errorHandlerMsg('Login e senha incorretos');
      }
    });
  }

  validate(u: User, user: User): boolean {
    if (user.email == u.email) {
      if (user.password == u.password) return true;
    }
    return false;
  }
}
