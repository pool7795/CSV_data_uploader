# csv_data_uploader

Este proyecto es una API REST que permite a los usuarios autenticados, específicamente con rol de admin, cargar archivos CSV para la creación de registros en una base de datos PostgreSQL. La aplicación valida los datos del archivo CSV, permite la corrección de registros inválidos y asegura que solo usuarios autorizados realicen la carga de datos.

- **API LINK:** https://csv-data-uploader.onrender.com
- **CREAR USUARIO:** https://csv-data-uploader.onrender.com/api/data
- **lOGIN DE USUARIO:** https://csv-data-uploader.onrender.com/api/auth/login
- **CARGA DE ARCHIVO CSV:** https://csv-data-uploader.onrender.com/api/csv/upload

## Tabla de Contenidos

1. [Requerimientos](#Requerimientos)
2. [Instalación](#Instalación)
3. [Configuración](#Configuración)
4. [Estructura del Proyecto](#Estructura-del-Proyecto)
5. [Endpoints](#Endpoints)
6. [Ejemplos-de-Solicitudes](#Ejemplos-de-Solicitudes)

## Requerimientos

-Necesitas tener Node.js, npm, y PostgreSQL instalados en tu entorno de desarrollo.

## Instalación

1. Clona este repositorio::

```bash
git@github.com:pool7795/csv_data_uploader.git
cd csv_data_uploader
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura la conexión a la base de datos en el archivo .env, un ejemplo se proporciona en el archivo ".env.example"".

4. Migra la base de datos:

```bash
npm run db:create
npm run db:migrate up
npm run db:seed
```

5. Inicia el servidor:

```bash
npm run dev
```

## Configuración

Crea un archivo ".env" en la raíz del proyecto y configura las siguientes variables de entorno. Un archivo .env.example se proporciona como plantilla:

```plaintext
# Configuración de la base de datos PostgreSQL
PGUSER=tu_usuario
PGHOST=localhost
PGNAME=nombre_de_la_base_de_datos
PGPASSWORD=tu_contraseña
PGPORT=5432

# Configuración del token JWT
JWT_SECRET_KEY=secreto_jwt
```

## Estructura del Proyecto

La aplicación sigue una arquitectura modular organizada de la siguiente manera:

- **src/config:** Configuraciones del proyecto.

  - `db.config.ts`: Configuración de la base de datos PostgreSQL.
  - `multer.config.ts`: Configuración de multer para la carga de archivos.
  - `swagger.ts`: Configuración de Swagger para la documentación de la API.

- **src/controllers:** Controladores para manejar las solicitudes.

  - `csvController.ts`: Controlador para manejar la carga y procesamiento de archivos CSV.
  - `dataController.ts`: Controlador para operaciones CRUD de usuarios.
  - `uploadController.ts`: Controlador para manejar la carga de archivos.

- **src/middleware:** Middleware para la autenticación y otras funcionalidades.

  - `authController.ts`: Middleware y controlador de autenticación.
  - `dataValidators.ts`: Reglas de validación para datos de usuario.
  - `error.ts`: Clase para manejar errores de la API.

- **src/models:** Definición de los modelos de datos.

  - `user.model.ts`: Modelo de usuario y validación.

- **src/routes:** Definición de las rutas de la API.

  - `authRoutes.ts`: Rutas para autenticación.
  - `csvRoutes.ts`: Rutas para carga de archivos CSV.
  - `dataRoutes.ts`: Rutas para operaciones CRUD de usuarios.
  - `uploadRoutes.ts`: Rutas para carga de archivos.

- **src/app.ts:** Configuración y creación de la aplicación Express.
- **src/index.ts:** Punto de entrada principal de la aplicación.

## Endpoints

### Autenticación

#### POST /api/auth/login

- **Descripción**: Autentica usuarios y devuelve un token JWT.
- **Body**: `email`, `password`
- **Respuesta**:
  - `200 OK`: Devuelve un token JWT.
  - `401 Unauthorized`: Credenciales incorrectas.

### Carga de Datos

#### POST /api/csv/upload

- **Descripción**: Permite la carga de archivos CSV para la creación de registros en la base de datos.
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Archivo CSV
- **Respuesta**:
  - `200 OK`: Detalle de los registros exitosos y errores específicos por registro y campo.
  - `400 Bad Request`: Archivo CSV inválido o errores de validación.
  - `401 Unauthorized`: Si el usuario no está autenticado o no tiene el rol `admin`.

### Operaciones CRUD de Usuarios

#### POST /api/data

- **Descripción**: Crea un nuevo usuario.
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `name`, `email`, `age`, `role`, `password`
- **Respuesta**:
  - `201 Created`: Usuario creado exitosamente.
  - `400 Bad Request`: Errores de validación.
  - `401 Unauthorized`: Si el usuario no está autenticado.

#### PUT /api/data/:id

- **Descripción**: Actualiza un usuario existente.
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `name`, `email`, `age`, `role`
- **Respuesta**:
  - `200 OK`: Usuario actualizado exitosamente.
  - `400 Bad Request`: Errores de validación.
  - `401 Unauthorized`: Si el usuario no está autenticado.

#### DELETE /api/data/:id

- **Descripción**: Elimina un usuario.
- **Headers**: `Authorization: Bearer <token>`
- **Respuesta**:
  - `200 OK`: Usuario eliminado exitosamente.
  - `401 Unauthorized`: Si el usuario no está autenticado.

## Ejemplos de Solicitudes

### Autenticación

#### POST /api/auth/login

**Solicitud:**

````json
{
  "email": "admin@example.com",
  "password": "admin123"
}

**Respuesta:**

```json
{
  "ok": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}

### Carga de Datos

#### POST /api/csv/upload
- **Descripción**: Permite la carga de archivos CSV para la creación de registros en la base de datos.
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Archivo CSV con los campos name, email, age, role, password.
- **Respuesta**:

```json
{
  "ok": true,
  "data": {
    "success": [
      {
        "id": 1,
        "name": "Juan Perez",
        "email": "juan.perez@example.com",
        "age": 28,
        "role": "user",
        "password": "hashed_password"
      }
    ],
    "errors": [
      {
        "row": 4,
        "details": {
          "name": "El campo 'name' no puede estar vacío.",
          "email": "El formato del campo 'email' es inválido.",
          "age": "El campo 'age' debe ser un número positivo.",
          "password": "El campo 'password' no puede estar vacío."
        }
      }
    ]
  }
}
````
