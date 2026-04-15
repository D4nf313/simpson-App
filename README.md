# The Simpsons App 🍩

¡Bienvenido/a al repositorio de **The Simpsons App**! Esta es una aplicación de pila completa (Full Stack) que consiste en una API construida con Spring Boot 3 y un cliente moderno desarrollado en Angular 18.

---

##  Prerrequisitos y Versiones Necesarias

Antes de comenzar, asegúrate de tener instalados los siguientes programas con las versiones mínimas recomendadas:

### Entorno Frontend:
- **Node.js**: v18.19.x o superior (Recomendado v20 LTS).
- **Angular CLI**: v18.0.0 o superior.

### Entorno Backend y Base de Datos:
- **Java Development Kit (JDK)**: v17 o superior (Recomendado Java 17 o 21).
- **Maven**: v3.8+ (o puedes usar el Wrapper incluído `mvnw`).
- **MySQL Server**: v8.0+.

---

##  Manual de Instalación

Sigue detalladamente estos pasos para levantar el entorno de desarrollo en tu propia máquina.

### Paso 1: Configuración de la Base de Datos
La aplicación está configurada de fábrica para conectarse a una base de datos MySQL local.
1. Abre tu gestor de MySQL local preferido (MySQL Workbench, DBeaver, phpMyAdmin, etc.) o tu terminal.
2. Crea una nueva base de datos vacía llamada **`simpson_db`**.
3. **Migración Inicial:** Puedes encontrar el script de inicialización con las queries necesarias (y datos semilla, si los hay) dentro del proyecto en la siguiente ruta: 
   ```text
   backend-simpsonApp/src/main/resources/db/init.sql
   ```
   *Ejecútalo en tu gestor de base de datos dentro de `simpson_db` para que se preparen las tablas.*

### Paso 2: Ejecutar el Backend (Spring Boot)
1. Abre una terminal y navega a la carpeta del backend:
   ```bash
   cd backend-simpsonApp
   ```
2. Asegúrate de que las credenciales de tu base de datos en `src/main/resources/application.properties` (usuario y contraseña) coincidan con las de tu equipo.
3. Inicia la aplicación usando Maven:
   ```bash
   mvn spring-boot:run
   ```
   *El servidor deberá inicializarse y exponer los servicios en el puerto predeterminado (usualmente `http://localhost:8080`).*

### Paso 3: Ejecutar el Frontend (Angular)
1. Abre otra ventana en tu terminal y navega a la carpeta del frontend:
   ```bash
   cd frontend-simpsonApp
   ```
2. Instala todas las dependencias requeridas (asegúrate de que el Backend ya esté corriendo para evitar errores de conexión al arrancar la UI):
   ```bash
   npm install
   ```
3. Levanta el servidor de desarrollo local de Angular:
   ```bash
   ng serve
   ```
4. Ingresa desde cualquier navegador a `http://localhost:4200/` y podrás ver la aplicación funcionando y consumiendo los datos.

---

## 📖 Documentación y Pruebas (Postman)

### Colección de Postman
La API cuenta con una estructura REST completa para gestionar los personajes. Si quieres probar los endpoints sin utilizar la interfaz gráfica, hemos incluido un archivo de exportación para Postman. 
- Puedes encontrarlo en:
  ```text
  backend-simpsonApp/SimpsonsAPI.postman_collection.json
  ```
Simplemente importa este archivo JSON dentro de tu aplicación de Postman y tendrás preparadas todas las peticiones listas para ejecutar (`GET`, `POST`, `PUT`, `DELETE`).

### Arquitectura de la Aplicación
Tenemos una documentación de soporte generada adicionalmente en la cual se especifican:
- **Diagrama de Contexto**
- **Modelo Entidad Relación**
- **Diagramas de Clases de la API REST**

Asegúrate de consultar ese documento arquitectónico, normalmente proporcionado en el entorno de documentación asociado para comprender a fondo los flujos de la lógica de negocio y las capas de caché del backend.
