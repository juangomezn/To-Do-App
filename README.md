# To-Do List App

## Descripción
Aplicación web de gestión de tareas construida con **Ionic + Angular (Standalone)** y **Node.js + Express + MySQL** como backend.  
Permite registrar usuarios, iniciar sesión, crear, editar y eliminar tareas con actualización en tiempo real y notificaciones (toasts) de éxito.

---

## Tecnologías

**Frontend:**
- Ionic 7
- Angular Standalone Components
- TypeScript
- HTML / SCSS

**Backend:**
- Node.js
- Express
- MySQL
- dotenv

**Extras:**
- JWT para autenticación
- Toasts para notificaciones
- Búsqueda de tareas en tiempo real

---

## Instalación

### Backend
1. Configurar archivo `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=*****
DB_NAME=todo_app
DB_PORT=3306
JWT_SECRET=*****
JWT_EXPIRES_IN=10m
PORT=4000
```

#### Instalar dependencias:
```
npm install
```

#### Inicializar base de datos:
```
npm run init-db
```

#### Ejecutar servidor:
```
npm run dev
```   

### Frontend

Instalar dependencias:
```
npm install
```

Ejecutar aplicación:

```
ionic serve
```

CRUD de tareas:

-- > Crear tareas con título y descripción opcional

-- > Editar tareas y cambiar estado (Pendiente / Completada)

-- > Eliminar tareas

-- > Búsqueda de tareas en tiempo real

-- > Toasts para notificaciones de éxito

-- > Interfaz limpia y responsiva

-- > Logout seguro

### Estructura del proyecto
```

Project To-Do-List/
│
├── backend/
│ └── src/
│ ├── app.js
│ ├── server.js
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ └── tasks.controller.js
│ ├── middlewares/
│ │ └── auth.middleware.js
│ ├── models/
│ │ ├── user.model.js
│ │ └── task.model.js
│ ├── routes/
│ │ ├── auth.routes.js
│ │ └── tasks.routes.js
│ └── init_db.js
│
├── frontend/
│ └── todoApp/
│ ├── src/
│ │ ├── app/
│ │ │ ├── app.routes.ts
│ │ │ ├── app.component.ts
│ │ │ ├── auth/
│ │ │ │ ├── login/
│ │ │ │ │ ├── login.page.ts
│ │ │ │ │ ├── login.page.html
│ │ │ │ │ └── login.page.scss
│ │ │ │ └── register/
│ │ │ │ ├── register.page.ts
│ │ │ │ ├── register.page.html
│ │ │ │ └── register.page.scss
│ │ │ ├── tasks/
│ │ │ │ ├── tasks.page.ts
│ │ │ │ ├── tasks.page.html
│ │ │ │ └── tasks.page.scss
│ │ │ ├── services/
│ │ │ │ ├── auth.service.ts
│ │ │ │ └── task.services.ts
│ │ │ └── interceptors/
│ │ │ └── token.interceptor.ts
│ │ ├── main.ts
│ │ └── index.html
│ └── package.json
│
├── .gitignore
└── README.md
