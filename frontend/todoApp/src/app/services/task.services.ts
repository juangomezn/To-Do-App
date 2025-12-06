import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
    id?: number;
    userId?: number;
    title: string;
    description?: string;
    status?: 'pending' | 'completed';
    createdAt?: string;
    updatedAt?: string;
}

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private base = 'http://localhost:4000/tasks';

    constructor(private http: HttpClient) { }

    list(): Observable<Task[]> {
        return this.http.get<Task[]>(this.base);
    }

    create(title: string, description?: string) {
        return this.http.post(this.base, { title, description });
    }

    update(id: number, fields: Partial<Task>) {
        return this.http.put(`${this.base}/${id}`, fields);
    }

    delete(id: number) {
        return this.http.delete(`${this.base}/${id}`);
    }
}
