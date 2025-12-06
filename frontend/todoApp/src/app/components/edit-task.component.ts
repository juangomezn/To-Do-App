import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../services/task.services';

@Component({
    selector: 'app-edit-task',
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
    template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Editar tarea</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <form (ngSubmit)="save()">
        <ion-item>
          <ion-label position="stacked">Título</ion-label>
          <ion-input [(ngModel)]="taskCopy.title" name="title" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Descripción</ion-label>
          <ion-textarea [(ngModel)]="taskCopy.description" name="description"></ion-textarea>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Estado</ion-label>
          <ion-select [(ngModel)]="taskCopy.status" name="status" interface="popover">
            <ion-select-option value="pending">Pendiente</ion-select-option>
            <ion-select-option value="completed">Completada</ion-select-option>
          </ion-select>
        </ion-item>

        <div class="ion-padding-top">
          <ion-button expand="block" type="submit">Guardar</ion-button>
          <ion-button expand="block" fill="clear" (click)="dismiss()">Cancelar</ion-button>
        </div>
      </form>
    </ion-content>
  `
})
export class EditTaskComponent {
    @Input() task!: Task;
    taskCopy!: Task;

    constructor(private modalCtrl: ModalController) { }

    ngOnInit() {
        // clonamos para no mutar la tarea original hasta guardar
        this.taskCopy = { ...this.task };
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

    save() {
        // Validación básica
        if (!this.taskCopy.title || this.taskCopy.title.trim().length === 0) {
            return;
        }
        // Devolvemos la tarea editada al caller
        this.modalCtrl.dismiss(this.taskCopy);
    }
}
