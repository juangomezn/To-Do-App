import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, logOut, search, checkmarkCircle, time, trash, listOutline } from 'ionicons/icons';
import { TaskService, Task } from '../services/task.services';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { EditTaskComponent } from '../components/edit-task.component'; // ruta según donde lo crees

addIcons({ add, logOut, search, checkmarkCircle, time, trash, listOutline });

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class TasksPage {
  tasks: Task[] = [];
  filtered: Task[] = [];

  constructor(
    private taskS: TaskService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router,
    private auth: AuthService,
    private modalCtrl: ModalController 
  ) {}

  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.taskS.list().subscribe({
      next: (res) => {
        this.tasks = res;
        this.filtered = [...this.tasks];
      },
      error: (err) => console.error('Error al cargar tareas:', err),
    });
  }

  onSearch(ev: any) {
    const q = ev.detail?.value?.toLowerCase() || '';
    this.filtered = this.tasks.filter((t) =>
      t.title.toLowerCase().includes(q)
    );
  }

  async showToast(msg: string, color: string = 'success') {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1200,
      position: 'top',
      color,
    });
    toast.present();
  }

  async createTaskPrompt() {
    const a = await this.alertCtrl.create({
      header: 'Crear tarea',
      inputs: [
        { name: 'title', placeholder: 'Título', attributes: { required: true } },
        { name: 'description', placeholder: 'Descripción (Opcional)' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Crear',
          handler: (data) => {
            if (!data.title) return false;

            this.taskS.create(data.title, data.description).subscribe({
              next: () => {
                this.load();
                this.showToast('Tarea creada con éxito');
              },
              error: (err) => console.error(err),
            });

            return true;
          },
        },
      ],
    });
    await a.present();
  }

   async editTask(t: Task) {
    const modal = await this.modalCtrl.create({
      component: EditTaskComponent,
      componentProps: { task: t }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    // 'data' será undefined si canceló, o la tarea editada si guardó
    if (data) {
      const updated: Partial<Task> = {
        title: data.title,
        description: data.description,
        status: data.status as 'pending' | 'completed'
      };

      this.taskS.update(t.id!, updated).subscribe({
        next: () => {
          this.load();
          this.showToast('Tarea actualizada');
        },
        error: (err) => console.error(err)
      });
    }
  }

  deleteTask(t: Task) {
    this.taskS.delete(t.id!).subscribe({
      next: () => {
        this.load();
        this.showToast('Tarea eliminada', 'danger');
      },
      error: (err) => console.error(err),
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
