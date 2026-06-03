# 🎓 Gaia - Panel Administrativo Educativo

Plantilla moderna de Angular para sistemas administrativos educativos con diseño profesional, componentes reutilizables y datos mock integrados.

## 🚀 Inicio Rápido

### Instalación
```bash
npm install
```

### Ejecutar en desarrollo
```bash
npm start
# o
ng serve
```

Acceder a `http://localhost:4200`

### Compilar para producción
```bash
ng build --configuration=production
```

## ✨ Características Incluidas

- **Dashboard** con métricas resumen
- **Gestión Financiera** - Ingresos y gastos
- **Inscripciones** - Administración de estudiantes
- **Puntuaciones** - Sistema de evaluación
- **Auxilios** - Gestión de becas y ayudas
- **Configuración** - Preferencias del sistema

### Componentes Integrados
- Sidebar colapsable con iconos
- Topbar con búsqueda, notificaciones y cambio de tema
- Modo claro/oscuro automático
- Tablas de datos con filtros y acciones
- Modales para CRUD
- Cards de estadísticas
- Diseño 100% responsive

### Stack Tecnológico
- **Angular 21** - Framework moderno
- **TypeScript 5.9** - Tipado estático
- **TailwindCSS** - Estilos responsivos
- **RxJS** - Programación reactiva
- **Standalone Components** - Arquitectura moderna

## 📁 Estructura

```
src/app/
├── core/              # Servicios centrales (theme)
├── layout/            # Sidebar, topbar
├── shared/            # Componentes y modelos compartidos
└── features/          # Módulos de funcionalidad
    ├── dashboard/
    ├── financiera/
    ├── inscripciones/
    ├── puntuacion/
    ├── identificacion-auxilio/
    └── configuracion/
```

## 🎨 Diseño

- **Colores**: Índigo/Púrpura como colores primarios
- **Tipografía**: Sistema del navegador
- **Bordes**: Redondeados 2xl
- **Sombras**: Suaves y profesionales
- **Spacing**: Sistema de 4px

## 🔄 Datos Mock

Todos los módulos incluyen servicios mock con:
- Simulated delays (200-300ms)
- CRUD operations completas
- Filtrado y búsqueda
- Datos de ejemplo realistas

Listos para reemplazar con APIs reales.

## 📱 Responsivo

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Sidebar colapsable en móviles
- Tablas con scroll horizontal

## 🌓 Tema

Cambiar tema desde el botón de sol/luna en la topbar:
- Detecta preferencia del sistema
- Persiste en localStorage
- Transiciones suaves

## 📊 Modules

### Financiera
- Registro de ingresos/gastos
- Sumario de balance
- Filtrado por tipo y categoría
- CRUD completo

### Inscripciones
- Gestión de estudiantes
- Estados y estado de pago
- Filtrado por programa
- Estadísticas de inscritos

### Puntuación
- Registro de calificaciones
- Promedio y estadísticas
- Filtrado por estudiante/materia
- Porcentajes y observaciones

### Auxilios
- Solicitudes de becas/ayudas
- Estados de aprobación
- Montos y tipos
- Tasa de rechazo

### Configuración
- Preferencias del sistema
- Configuración de usuario
- Notificaciones
- Reset a valores por defecto

## 🛠️ Personalización

### Agregar nuevo módulo
1. Crear carpeta en `features/nuevo-modulo`
2. Crear componente, servicio y modelos
3. Agregar ruta en `app.routes.ts`
4. Actualizar menú en `sidebar.component.ts`

### Integrar API
Reemplazar en servicios:
```typescript
// Antes (mock)
return of(data).pipe(delay(300));

// Después (real)
return this.http.get('/api/data');
```

### Cambiar colores
Editar `tailwind.config.js`:
```javascript
primary: { /* tus colores */ }
```

## 🎯 Componentes Reutilizables

- `StatCardComponent` - Cards de estadísticas
- `DataTableComponent` - Tablas con filtros
- `ModalComponent` - Diálogos genéricos
- `FilterBarComponent` - Barra de filtros
- `SidebarComponent` - Menú lateral
- `TopbarComponent` - Barra superior

## 📖 Documentación Completa

Ver [GUIA_COMPLETA.md](./GUIA_COMPLETA.md) para documentación detallada.

## 🔗 Rutas Principales

```
/dashboard           - Panel principal
/financiera          - Gestión financiera
/inscripciones       - Inscripciones
/puntuacion          - Puntuaciones
/identificacion-auxilio - Auxilios
/configuracion       - Configuración
```

## 📦 Scripts

```bash
npm start              # Servidor de desarrollo
npm run build          # Build producción
npm run watch          # Build en watch mode
npm test               # Ejecutar tests
npm run serve:ssr      # Servidor SSR
```

## 🐛 Issues Comunes

**Error de módulo**
- Verificar alias en `tsconfig.app.json`
- Reiniciar `ng serve`

**Estilos no aplican**
- Asegurar que `styles.css` importa Tailwind
- Limpiar caché: `rm -rf node_modules/.cache`

## 📝 Notas

- Proyecto original, sin copiar código propietario
- Todos los datos son simulados (mock)
- Preparado para integración con APIs reales
- 100% responsive y accessible
- Soporta tema claro/oscuro

## 🚀 Next Steps

1. Revisar componentes en `src/app/shared/components/`
2. Explorar servicios mock en `src/app/features/*/services/`
3. Personalizar colores en `tailwind.config.js`
4. Agregar autenticación cuando sea necesario
5. Integrar APIs reales en los servicios

---

**Versión**: 1.0.0  
**Angular**: 21.1.0  
**Node**: 18+  
**npm**: 9+

¡Listo para desarrollar! 🎉
