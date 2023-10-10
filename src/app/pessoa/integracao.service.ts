import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { User } from '../class/user.model';

@Injectable({
  providedIn: 'root',
})
export class IntegracaoService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  private urlPessoas = 'http://localhost:8082';

  insertUser(obj: User): Observable<User> {
    return this.http.post<User>(`${this.urlPessoas}/register`, obj).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  getById(id: number): Observable<User> {
    const url = `${this.urlPessoas}/${id}`;
    return this.http.get<User>(url).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  getByEmail(email: string): Observable<User> {
    const url = `${this.urlPessoas}/login`;
    const params = new HttpParams().set('email', email);
    return this.http.get<User>(url, { params: params }).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  validate(user: User): Observable<User> {
    const url = `${this.urlPessoas}/user`;
    return this.http.post<User>(url, user).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['color-error'] : ['color-success'],
    });
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage(`${e.error.mensagem}`, true);
    return EMPTY;
  }

  errorHandlerMsg(msg: string): Observable<string> {
    this.showMessage(`${msg}`, true);
    return EMPTY;
  }
}
