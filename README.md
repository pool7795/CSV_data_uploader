# csv_data_uploader

This project is a REST API that allows authenticated users, specifically those with the admin role, to upload CSV files for creating records in a PostgreSQL database. The application validates the data in the CSV file, allows correction of invalid records, and ensures that only authorized users can upload data.

- **API LINK:** https://csv-data-uploader.onrender.com
- **CREATE USER:** https://csv-data-uploader.onrender.com/api/data
- **USER LOGIN:** https://csv-data-uploader.onrender.com/api/auth/login
- **CSV FILE UPLOAD:** https://csv-data-uploader.onrender.com/api/csv/upload

## Table of Contents

1. [Requirements](#Requirements)
2. [Installation](#Installation)
3. [Configuration](#Configuration)
4. [Project Structure](#Project-Structure)
5. [Endpoints](#Endpoints)
6. [Request Examples](#Request-Examples)

## Requirements

-You need to have Node.js, npm, and PostgreSQL installed in your development environment.

## Installation

1. Clone this repository:

```bash
git@github.com:pool7795/csv_data_uploader.git
cd csv_data_uploader
```

2. Install the dependencies:

```bash
npm install
```

3. Configure the database connection in the .env file, an example is provided in the ".env.example" file.

4. Migrate the database:

```bash
npm run db:create
npm run db:migrate up
npm run db:seed
```

5. Start the server:

```bash
npm run dev
```

## Configuration

Create a ".env" file in the root of the project and configure the following environment variables. An .env.example file is provided as a template:

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

## Project Structure

The application follows a modular architecture organized as follows:

- **src/config:** Project configurations.

  - `db.config.ts`: Configuración de la base de datos PostgreSQL.
  - `multer.config.ts`: Configuración de multer para la carga de archivos.
  - `swagger.ts`: Configuración de Swagger para la documentación de la API.

- **src/controllers:** Controllers to handle requests.

  - `csvController.ts`: Controlador para manejar la carga y procesamiento de archivos CSV.
  - `dataController.ts`: Controlador para operaciones CRUD de usuarios.
  - `uploadController.ts`: Controlador para manejar la carga de archivos.

- **src/middleware:** Middleware for authentication and other functionalities.

  - `authController.ts`: Middleware y controlador de autenticación.
  - `dataValidators.ts`: Reglas de validación para datos de usuario.
  - `error.ts`: Clase para manejar errores de la API.

- **src/models:** Data model definitions.

  - `user.model.ts`: Modelo de usuario y validación.

- **src/routes:** API route definitions.

  - `authRoutes.ts`: Rutas para autenticación.
  - `csvRoutes.ts`: Rutas para carga de archivos CSV.
  - `dataRoutes.ts`: Rutas para operaciones CRUD de usuarios.
  - `uploadRoutes.ts`: Rutas para carga de archivos.

- **src/app.ts:** Express application configuration and creation.
- **src/index.ts:** Main entry point of the application.

## Endpoints

### Autenticación

#### POST /api/auth/login

- **Descripción**: Authenticates users and returns a JWT token.
- **Body**: `email`, `password`
- **Response**:
  - `200 OK`: Returns a JWT token.
  - `401 Unauthorized`: Incorrect credentials.

### Data Upload

#### POST /api/csv/upload

- **Description**: Allows the upload of CSV files for creating records in the database.
- **Headers**: `Authorization: Bearer <token>`
- **Body**: CSV file
- **Response**:
  - `200 OK`: Details of successful records and specific errors per record and field.
  - `400 Bad Request`: Invalid CSV file or validation errors.
  - `401 Unauthorized`: If the user is not authenticated or does not have the `admin` role.

### User CRUD Operations

#### POST /api/data

- **Description**: Creates a new user.
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `name`, `email`, `age`, `role`, `password`
- **Response**:
  - `201 Created`: Usuario creado exitosamente.
  - `400 Bad Request`: Errores de validación.
  - `401 Unauthorized`: Si el usuario no está autenticado.

#### PUT /api/data/:id

- **Description**: Actualiza un usuario existente.
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `name`, `email`, `age`, `role`
- **Response**:
  - `200 OK`: Usuario actualizado exitosamente.
  - `400 Bad Request`: Errores de validación.
  - `401 Unauthorized`: Si el usuario no está autenticado.

#### DELETE /api/data/:id

- **Description**: Deletes a user.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  - `200 OK`: Usuario eliminado exitosamente.
  - `401 Unauthorized`: Si el usuario no está autenticado.

## Request Examples

### Authentication

#### POST /api/auth/login

**Request:**

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response:**

```json
{
  "ok": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

### Data Upload

#### POST /api/csv/upload

**Headers:**

```makefile
Authorization: Bearer <token>
```

**Body:**

- Archivo CSV con los campos name, email, age, role, password.

**Response:**

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
```
