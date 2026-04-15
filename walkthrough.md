# 🍩 Los Simpsons App — Frontend Walkthrough

## 🏆 Lo Que Hemos Construido

Acabamos de finalizar el Frontend **Angular 18** para la aplicación de Los Simpsons. La aplicación se conecta limpiamente con el backend de Spring Boot construido en la sesión anterior y presenta todo en un entorno visual inmersivo ambientado en Springfield.

### ⚙️ Stack y Decisiones Técnicas
- **Framework**: Angular 18 con Signals (`signal()`, `computed()`) y Control Flow.
- **Librería de Componentes**: PrimeNG v18 y PrimeFlex para layout fácil y robusto, liberándonos del CSS tedioso sin forzar un estilo "empresarial".
- **Comunicaciones HTTP**: HttpClient con rutas observables a `http://localhost:8080/api/v1/characters`.
- **Manejo de Imágenes**: En lugar de configurar infraestructura en la nube, las imágenes se leen en JavaScript vía `FileReader` y se guardan como Base64 (LONGTEXT) en la base de datos de forma nativa.
- **Rutas (Lazy Loading)**: La optimización total se garantizó cargando archivos de script sólo cuando el usuario lo necesita (`/characters` se pospone hasta dar click).

---

## 🎨 Sistema de Diseño "Springfield"

> [!NOTE]
> Hemos evitado frameworks opinionados como Angular Material para crear desde cero un estilo 100% temático.

- **Fondo de Nubes Reales**: Agregamos una animación CSS de scroll infinito al `body` (`styles/_clouds.scss`) que da vida a toda la experiencia.
- **Tarjeta Cartoon**: Las cajas del diseño (`.cartoon-card`, `.cartoon-btn`) tienen bordes negros sólidos de 3px y sombras gruesas simulando el efecto 2D de la caricatura.

---

## 🏗️ Rutas y Estructura

El sistema se diseñó usando standalone components con la clásica división Clean Architecture en Angular:

### 1. Core (`/core`)
- `character.model.ts`: Tipos estrictos mapeados directamente desde la API Java.
- `character.service.ts`: Único punto de verdad inyectable para operaciones HTTP.
- **Layout Shell**: El cascarón de la app (`Header`, `Sidebar`, `Footer`). Suaviza la navegación usando el `MainLayoutComponent` como contenedor base de `router-outlet`.

### 2. Shared (`/shared`)
- `CharacterCardComponent`: Las tarjetas amarillas que recogen la foto, nombre, rol y familia del personaje con un diseño responsivo.

### 3. Features (`/features`)
| Ruta de navegación | Componente | Lo que hace |
|---|---|---|
| `/` | `HomeComponent` | Bienvenida a Springfield con la fuente típica gruesa. |
| `/characters` | `CharacterListComponent` | Llama al backend, muestra la cuadrícula de tarjetas de personaje y provee un Dropdown de PrimeNG para ordenar datos entre los más recientes o alfabéticamente. Al cliquear una tarjeta abre un **Modal de Vista Previa**. |
| `/characters/new` | `CharacterFormComponent` | Construido con **ReactiveForms**. Incluye un `input type="file"` que pre-visualiza la imagen en el formulario de inmediato subiéndola como Base64 al backend. |
| `/characters/edit/:id` | `CharacterFormComponent` | El mismo componente reactivo se recicla analizando el router para entrar en Modo Edición. |

---

## 🚀 Cómo Empezar a Probar Todo el Proyecto Junto

Sigue este orden estricto para que todo funcione a la perfección:

> [!IMPORTANT]
> **Base de Datos y Backend Primero**

1.Abre MySQL y confírmate que la base de datos `simpsons_db` exista:
```sql
CREATE DATABASE simpsons_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Ejecuta tu Backend SpringBoot (desde la carpeta `backend-simpsonApp`):
```bash
mvn spring-boot:run
```
 *(Se debe estar ejecutando en el puerto 8080)*

> [!TIP]
> **Ahora si, el Frontend**

3. Abre una terminal nueva, y entra a la carpeta del frontend que acabo de crear:
```bash
cd frontend
```

4. Corre el servidor de desarrollo de Angular:
```bash
npm start
```
*(O también: `ng serve`)*

5. Finalmente, ingresa a la aplicación en **http://localhost:4200/** y navega libremente desde la barra lateral. Podrás crear a Homero, Marge y editarlos viendo los cambios guardarse en tiempo real en tu base de datos de MySQL.
