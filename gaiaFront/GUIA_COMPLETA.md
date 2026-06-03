# Gaia - Panel de Administración Educativo

Sistema moderno de administración educativo construido con Angular 21, TypeScript, TailwindCSS y Angular Material.

## 🚀 Características Principales

### Módulos de Funcionalidad
- **Dashboard**: Panel principal con métricas resumen
- **Gestión Financiera**: Registro de ingresos y gastos
- **Inscripciones**: Administración de estudiantes
- **Puntuaciones**: Sistema de evaluación y calificaciones
- **Identificación de Auxilio**: Gestión de becas y ayudas
- **Configuración**: Preferencias del sistema

### Características Técnicas
- ✅ Angular 21 con Standalone Components
- ✅ TypeScript 5.9
- ✅ TailwindCSS para estilos responsivos
- ✅ Modo claro/oscuro automático
- ✅ Sidebar colapsable
- ✅ Tablas de datos con filtros
- ✅ Modales para CRUD
- ✅ Servicios mock con RxJS
- ✅ Rutas optimizadas
- ✅ Diseño responsive
- ✅ Componentes reutilizables

## 📋 Requisitos

- Node.js 18+ (recomendado 20+)
- npm 9+
- Angular CLI 21

## 💻 Instalación y Setup

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar servidor de desarrollo
```bash
ng serve
```
o
```bash
npm start
```

El servidor estará disponible en `http://localhost:4200/`

### 3. Compilar para producción
```bash
ng build --configuration=production
```

El build se generará en la carpeta `dist/`

## 📁 Estructura del Proyecto

```
src/app/
├── core/
│   └── services/
│       └── theme.service.ts          # Servicio de tema claro/oscuro
├── layout/
│   ├── components/
│   │   ├── sidebar.component.ts      # Menú lateral
│   │   └── topbar.component.ts       # Barra superior
│   └── layout.component.ts            # Componente principal de layout
├── shared/
│   ├── components/
│   │   ├── stat-card.component.ts    # Card de estadísticas
│   │   ├── data-table.component.ts   # Tabla de datos reutilizable
│   │   ├── modal.component.ts        # Modal genérico
│   │   └── filter-bar.component.ts   # Barra de filtros
│   └── models/
│       └── index.ts                   # Modelos compartidos
├── features/
│   ├── dashboard/
│   │   └── dashboard.component.ts    # Panel principal
│   ├── financiera/
│   │   ├── models/
│   │   │   └── financial.model.ts
│   │   ├── services/
│   │   │   └── financial.service.ts
│   │   └── financiera.component.ts
│   ├── inscripciones/
│   │   ├── models/
│   │   │   └── inscription.model.ts
│   │   ├── services/
│   │   │   └── inscription.service.ts
│   │   └── inscripciones.component.ts
│   ├── puntuacion/
│   │   ├── models/
│   │   │   └── score.model.ts
│   │   ├── services/
│   │   │   └── score.service.ts
│   │   └── puntuacion.component.ts
│   ├── identificacion-auxilio/
│   │   ├── models/
│   │   │   └── aid.model.ts
│   │   ├── services/
│   │   │   └── aid.service.ts
│   │   └── identificacion-auxilio.component.ts
│   └── configuracion/
│       ├── models/
│       │   └── settings.model.ts
│       ├── services/
│       │   └── settings.service.ts
│       └── configuracion.component.ts
├── app.routes.ts                      # Configuración de rutas
├── app.ts                             # Componente raíz
└── app.config.ts                      # Configuración de aplicación

styles.css                              # Estilos globales con Tailwind
tailwind.config.js                      # Configuración de TailwindCSS
postcss.config.js                       # Configuración de PostCSS
```

## 🎨 Diseño y Paleta de Colores

### Colores Principales
- **Primary (Índigo)**: #5b5dff - #1e1b4b
- **Secondary (Púrpura)**: #a855f7 - #581c87
- **Success (Verde)**: Validaciones y estados positivos
- **Warning (Amarillo)**: Alertas y pendientes
- **Error (Rojo)**: Errores y rechazos

### Tipografía
- Fuente predeterminada: Sistema del navegador
- Headings: Bold
- Body: Regular (400)
- Small: Regular (400)

## 🔄 Flujo de Datos

Todos los módulos utilizan servicios mock que simulan llamadas API:

```
Componente → Servicio → Observable (delay 200-300ms) → Componente
```

Los servicios se encuentran en `features/[modulo]/services/` y están listos para ser reemplazados por llamadas HTTP reales.

## 🛠️ Componentes Reutilizables

### StatCardComponent
Tarjetas de estadísticas con trending opcional.
```typescript
[config]="{
  title: 'Título',
  value: 1234,
  icon: 'chart',
  color: 'primary',
  trend: { value: 12, direction: 'up' }
}"
```

### DataTableComponent
Tabla de datos con acciones y paginación.
```typescript
[config]="{
  columns: TableColumn[],
  data: any[],
  loading: boolean,
  paginated: true,
  pageSize: 10
}"
```

### ModalComponent
Modal genérico para crear/editar.
```typescript
[isOpen]="boolean"
[title]="string"
confirmText="Guardar"
(onClose)="closeModal()"
(onConfirmClick)="saveData()"
```

### FilterBarComponent
Barra de filtros reutilizable.
```typescript
[fields]="FilterField[]"
(onFilter)="onFilter($event)"
```

## 🌓 Modo Claro/Oscuro

El tema se gestiona automáticamente con el `ThemeService`:
- Se detecta la preferencia del sistema automáticamente
- Se guarda en localStorage para persistencia
- Se puede cambiar desde el botón en la topbar

## 📱 Responsive Design

El diseño es completamente responsive:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

El sidebar se colapsa automáticamente en dispositivos pequeños.

## 🔌 Servicios Mock

Cada módulo incluye un servicio mock completo:

### FinancialService
- `getFinancialRecords(page, pageSize)`
- `getFinancialSummary()`
- `createFinancialRecord(record)`
- `updateFinancialRecord(id, record)`
- `deleteFinancialRecord(id)`
- `getRecordsByType(type)`

### InscriptionService
- `getInscriptions(page, pageSize)`
- `getInscriptionStats()`
- `createInscription(inscription)`
- `updateInscription(id, inscription)`
- `deleteInscription(id)`
- `getInscriptionsByStatus(status)`

### ScoreService
- `getScores(page, pageSize)`
- `getScoreSummary()`
- `createScore(score)`
- `updateScore(id, score)`
- `deleteScore(id)`
- `getScoresByStudent(studentId)`

### AidService
- `getAidIdentifications(page, pageSize)`
- `getAidSummary()`
- `createAidIdentification(aid)`
- `updateAidIdentification(id, aid)`
- `deleteAidIdentification(id)`

### SettingsService
- `getSystemSettings()`
- `updateSystemSettings(settings)`
- `getUserSettings()`
- `updateUserSettings(settings)`

## 🚀 Escalabilidad

El proyecto está diseñado para escalar fácilmente:

1. **Agregar nuevo módulo**:
   ```bash
   ng g m features/nuevo-modulo
   ```
   - Crear componente, servicio y modelos
   - Agregar ruta en `app.routes.ts`
   - Actualizar menú en `sidebar.component.ts`

2. **Integrar API real**:
   - Reemplazar servicios mock con HttpClient
   - Actualizar URLs en los servicios
   - Agregar manejo de errores

3. **Agregar autenticación**:
   - Implementar AuthService en core
   - Agregar guards en rutas
   - Intercepción de headers

## 📦 Dependencias Principales

- **@angular/core**: Framework principal
- **@angular/material**: Componentes Material (disponible para uso futuro)
- **tailwindcss**: Framework CSS utility-first
- **rxjs**: Programación reactiva
- **typescript**: Tipado estático

## 🔒 Seguridad

- Input sanitization en campos de formulario
- Validaciones de formulario básicas
- Confirmación antes de eliminar datos
- Control de acceso (preparado para implementar)

## 📝 Ejemplos de Uso

### Crear nuevo registro en Financiera
1. Click en "Nuevo Registro"
2. Completar formulario
3. Click "Guardar"
4. Tabla se actualiza automáticamente

### Filtrar inscripciones
1. Ir a "Inscripciones"
2. Seleccionar filtros (Programa, Estado, etc.)
3. Tabla se filtra en tiempo real

### Cambiar tema
1. Click en icono sol/luna en topbar
2. Tema cambia automáticamente
3. Preferencia se guarda en navegador

## 🐛 Troubleshooting

**Error: "Cannot find module '@app/..."**
- Asegurar que el alias está en `tsconfig.app.json`
- Reiniciar el servidor ng serve

**Estilos no se aplican**
- Verificar que TailwindCSS está en `styles.css`
- Ejecutar `npm run build` o reiniciar servidor

**Servicios mock sin datos**
- Verificar que las rutas son correctas en `app.routes.ts`
- Revisar consola del navegador para errores

## 📚 Recursos

- [Angular 21 Documentation](https://angular.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev)

## 📄 Licencia

Código original - Proyecto educativo

---

**Versión**: 1.0.0  
**Última actualización**: Junio 2024  
**Autor**: Equipo de Desarrollo Gaia
