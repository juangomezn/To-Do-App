import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';    
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink        
  ]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  isLoggingIn: boolean = false;

  private apiUrl = 'http://localhost:4000/auth/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Aviso',
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  login() {
    if (this.isLoggingIn || !this.email || !this.password) {
      if (!this.isLoggingIn) this.presentAlert('Debe llenar todos los campos');
      return;
    }

    this.isLoggingIn = true;

    this.http.post(this.apiUrl, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        console.log('LOGIN PAGE: Token recibido y guardando en localStorage.');

        localStorage.setItem('token', res.token);

        setTimeout(() => {
          this.isLoggingIn = false;
          this.router.navigate(['/tasks']);
        }, 500);
      },
      error: (err) => {
        this.isLoggingIn = false;
        console.error('Error al iniciar sesión:', err);
        this.presentAlert(err.error?.message || 'Error al iniciar sesión. Verifica el servidor y credenciales.');
      }
    });
  }
}