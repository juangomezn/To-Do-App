import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async present(message: string, header = 'Aviso') {
    const a = await this.alertCtrl.create({ header, message, buttons: ['OK'] });
    await a.present();
  }

  register() {
    if (!this.name || !this.email || !this.password) {
      this.present('Completa todos los campos');
      return;
    }

    this.auth.register(this.name, this.email, this.password).subscribe({
      next: (res: any) => {
        this.present('Usuario registrado correctamente', 'Éxito');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.present(err.error?.message || 'Error al registrar');
      }
    });
  }
}
