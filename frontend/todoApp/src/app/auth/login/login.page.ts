import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = '';
  password: string = '';

  private apiUrl = 'http://localhost:4000/auth/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Aviso',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  login() {
    if (!this.email || !this.password) {
      this.presentAlert('Debe llenar todos los campos');
      return;
    }

    this.http.post(this.apiUrl, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error(err);
        this.presentAlert(err.error?.message || 'Error al iniciar sesión');
      }
    });
  }
}
