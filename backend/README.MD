# Mini API Auth

API de autenticación construida con **Node.js**, **Express** y **MySQL**. Esta API proporciona funcionalidades de registro, inicio de sesión, verificación de cuenta, y gestión de perfiles de usuario. Además, incluye la gestión de productos.

## Tabla de Contenidos

1. [Descripción](#descripción)
2. [Endpoints](#endpoints)
3. [Instalación](#instalación)
4. [Licencia](#licencia)

## Descripción

Esta API permite a los usuarios registrarse, iniciar sesión, verificar su cuenta, y gestionar su perfil. Además, los administradores pueden agregar, actualizar, eliminar y obtener productos.

## Endpoints

### Auth

- **POST /auth/register**
  - Descripción: Registrar un nuevo usuario.
  - Respuesta exitosa: `201 Created`.
  - Respuesta de error: `400 Bad Request`.

- **POST /auth/login**
  - Descripción: Iniciar sesión con las credenciales del usuario.
  - Respuesta exitosa: `200 OK` (con un token JWT).
  - Respuesta de error: `401 Unauthorized`.

- **GET /auth/logout**
  - Descripción: Cerrar sesión (invalidar el token JWT).
  - Respuesta exitosa: `200 OK`.
  - Respuesta de error: `401 Unauthorized`.

- **GET /auth/status**
  - Descripción: Verificar el estado de autenticación del usuario (requerido estar autenticado).
  - Respuesta exitosa: `200 OK`.

- **GET /auth/perfil**
  - Descripción: Obtener el perfil del usuario autenticado.
  - Respuesta exitosa: `200 OK`.
  - Respuesta de error: `401 Unauthorized`.

- **PUT /auth/perfil**
  - Descripción: Actualizar el perfil del usuario autenticado.
  - Respuesta exitosa: `200 OK`.
  - Respuesta de error: `400 Bad Request`, `401 Unauthorized`.

- **DELETE /auth/perfil**
  - Descripción: Eliminar al usuario autenticado.
  - Respuesta exitosa: `200 OK`.
  - Respuesta de error: `401 Unauthorized`.

- **GET /auth/verify/{token}**
  - Descripción: Verificar una cuenta usando un token.
  - Respuesta exitosa: `200 OK`.
  - Respuesta de error: `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`.

### Products

- **GET /products**
  - Descripción: Obtener todos los productos.
  - Respuesta exitosa: `200 OK`.

- **POST /products**
  - Descripción: Agregar un nuevo producto (requiere autenticación).
  - Respuesta exitosa: `201 Created`.
  - Respuesta de error: `401 Unauthorized`, `403 Forbidden`.

- **GET /products/{sku}**
  - Descripción: Obtener un producto por su SKU.
  - Respuesta exitosa: `200 OK`.
  - Respuesta de error: `404 Not Found`.

- **PUT /products/{sku}**
  - Descripción: Actualizar un producto existente (requiere autenticación).
  - Respuesta exitosa: `200 OK`.
  - Respuesta de error: `401 Unauthorized`, `403 Forbidden`.

- **DELETE /products/{sku}**
  - Descripción: Eliminar un producto (requiere autenticación).
  - Respuesta exitosa: `200 OK`.
  - Respuesta de error: `401 Unauthorized`, `403 Forbidden`.

