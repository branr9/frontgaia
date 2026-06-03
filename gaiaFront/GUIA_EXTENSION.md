# 📚 Guía de Extensión - Agregar Nuevas Características

## 🔨 Agregar Nuevo Módulo

### Paso 1: Crear la estructura de carpetas

```bash
mkdir -p src/app/features/nuevo-modulo/{models,services}
```

### Paso 2: Crear el modelo (TypeScript)

**`src/app/features/nuevo-modulo/models/nuevo.model.ts`**
```typescript
export interface NuevoItem {
  id: string;
  nombre: string;
  descripcion: string;
  estado: 'activo' | 'inactivo';
  fecha: Date;
  valor: number;
}

export interface NuevoStats {
  total: number;
  activos: number;
  inactivos: number;
  promedioValor: number;
}
```

### Paso 3: Crear el servicio mock

**`src/app/features/nuevo-modulo/services/nuevo.service.ts`**
```typescript
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { NuevoItem, NuevoStats } from '../models/nuevo.model';

@Injectable({
  providedIn: 'root'
})
export class NuevoService {
  private mockData: NuevoItem[] = [
    {
      id: '1',
      nombre: 'Elemento 1',
      descripcion: 'Descripción',
      estado: 'activo',
      fecha: new Date(),
      valor: 100
    }
    // Más items...
  ];

  constructor() {}

  getItems(page: number = 1, pageSize: number = 10): Observable<NuevoItem[]> {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return of(this.mockData.slice(start, end)).pipe(delay(300));
  }

  getStats(): Observable<NuevoStats> {
    return of({
      total: this.mockData.length,
      activos: this.mockData.filter(i => i.estado === 'activo').length,
      inactivos: this.mockData.filter(i => i.estado === 'inactivo').length,
      promedioValor: Math.round(
        this.mockData.reduce((sum, i) => sum + i.valor, 0) / this.mockData.length
      )
    }).pipe(delay(200));
  }

  createItem(item: Omit<NuevoItem, 'id'>): Observable<NuevoItem> {
    const newItem: NuevoItem = {
      ...item,
      id: Date.now().toString()
    };
    this.mockData.unshift(newItem);
    return of(newItem).pipe(delay(300));
  }

  updateItem(id: string, item: Partial<NuevoItem>): Observable<NuevoItem> {
    const index = this.mockData.findIndex(i => i.id === id);
    if (index !== -1) {
      this.mockData[index] = { ...this.mockData[index], ...item };
      return of(this.mockData[index]).pipe(delay(300));
    }
    return of(null as any);
  }

  deleteItem(id: string): Observable<void> {
    this.mockData = this.mockData.filter(i => i.id !== id);
    return of(undefined).pipe(delay(300));
  }
}
```

### Paso 4: Crear el componente

**`src/app/features/nuevo-modulo/nuevo.component.ts`**
```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatCardComponent } from '@app/shared/components/stat-card.component';
import { DataTableComponent, TableColumn } from '@app/shared/components/data-table.component';
import { ModalComponent } from '@app/shared/components/modal.component';
import { FilterBarComponent, FilterField } from '@app/shared/components/filter-bar.component';
import { NuevoService } from './services/nuevo.service';
import { NuevoItem } from './models/nuevo.model';

@Component({
  selector: 'app-nuevo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StatCardComponent,
    DataTableComponent,
    ModalComponent,
    FilterBarComponent
  ],
  template: `
    <div class="space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Mi Módulo</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">Descripción del módulo</p>
        </div>
        <button
          (click)="openCreateModal()"
          class="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Nuevo Item
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <app-stat-card
          *ngIf="stats$ | async as stats"
          [config]="{
            title: 'Total',
            value: stats.total,
            color: 'primary',
            icon: 'chart'
          }"
        ></app-stat-card>

        <app-stat-card
          *ngIf="stats$ | async as stats"
          [config]="{
            title: 'Activos',
            value: stats.activos,
            color: 'success',
            icon: 'users'
          }"
        ></app-stat-card>

        <app-stat-card
          *ngIf="stats$ | async as stats"
          [config]="{
            title: 'Inactivos',
            value: stats.inactivos,
            color: 'warning',
            icon: 'chart'
          }"
        ></app-stat-card>

        <app-stat-card
          *ngIf="stats$ | async as stats"
          [config]="{
            title: 'Promedio Valor',
            value: stats.promedioValor,
            color: 'secondary',
            icon: 'money'
          }"
        ></app-stat-card>
      </div>

      <!-- Table -->
      <app-data-table
        [config]="{
          columns: columns,
          data: items,
          loading: isLoading,
          paginated: true,
          pageSize: 10,
          currentPage: 1
        }"
        (onView)="viewItem($event)"
        (onEdit)="editItem($event)"
        (onDelete)="deleteItem($event)"
      ></app-data-table>
    </div>

    <!-- Modal -->
    <app-modal
      [isOpen]="isModalOpen"
      [title]="isEditMode ? 'Editar' : 'Crear Nuevo'"
      confirmText="Guardar"
      (onClose)="closeModal()"
      (onConfirmClick)="saveItem()"
    >
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Nombre
          </label>
          <input
            type="text"
            [(ngModel)]="formData.nombre"
            name="nombre"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Descripción
          </label>
          <textarea
            [(ngModel)]="formData.descripcion"
            name="descripcion"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows="3"
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Estado
            </label>
            <select
              [(ngModel)]="formData.estado"
              name="estado"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Valor
            </label>
            <input
              type="number"
              [(ngModel)]="formData.valor"
              name="valor"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </form>
    </app-modal>
  `
})
export class NuevoComponent implements OnInit {
  items: NuevoItem[] = [];
  stats$ = this.service.getStats();
  isLoading = false;
  isModalOpen = false;
  isEditMode = false;
  editingId: string | null = null;

  columns: TableColumn[] = [
    { key: 'nombre', label: 'Nombre', sortable: true },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'valor', label: 'Valor', type: 'number' },
    { key: 'fecha', label: 'Fecha', type: 'date' },
    { key: 'estado', label: 'Estado', type: 'status' }
  ];

  formData: any = {};

  constructor(private service: NuevoService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.isLoading = true;
    this.service.getItems().subscribe({
      next: (data) => {
        this.items = data;
        this.isLoading = false;
      }
    });
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.formData = { estado: 'activo', fecha: new Date() };
    this.isModalOpen = true;
  }

  editItem(item: NuevoItem): void {
    this.isEditMode = true;
    this.editingId = item.id;
    this.formData = { ...item };
    this.isModalOpen = true;
  }

  deleteItem(item: NuevoItem): void {
    if (confirm(`¿Eliminar "${item.nombre}"?`)) {
      this.service.deleteItem(item.id).subscribe(() => {
        this.loadItems();
      });
    }
  }

  viewItem(item: NuevoItem): void {
    console.log('Viewing item:', item);
  }

  saveItem(): void {
    const operation = this.isEditMode
      ? this.service.updateItem(this.editingId!, this.formData)
      : this.service.createItem(this.formData);

    operation.subscribe(() => {
      this.loadItems();
      this.closeModal();
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.formData = {};
    this.editingId = null;
  }
}
```

### Paso 5: Agregar ruta

**`src/app/app.routes.ts`** - Agregar:
```typescript
{
  path: 'nuevo-modulo',
  component: NuevoComponent,
  data: { title: 'Mi Módulo' }
}
```

### Paso 6: Actualizar sidebar

**`src/app/layout/components/sidebar.component.ts`** - Agregar al array `menuItems`:
```typescript
{
  id: 'nuevo',
  label: 'Mi Módulo',
  icon: 'chart',
  route: '/nuevo-modulo'
}
```

## 🔄 Integrar API Real

### Cambiar servicio mock a HTTP

```typescript
// Antes
import { Observable, of, delay } from 'rxjs';

getItems(): Observable<NuevoItem[]> {
  return of(this.mockData).pipe(delay(300));
}

// Después
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

getItems(): Observable<NuevoItem[]> {
  return this.http.get<NuevoItem[]>('/api/items');
}
```

### Agregar HttpClient al config

**`src/app/app.config.ts`**:
```typescript
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    // ...
  ]
};
```

## 🔐 Agregar Autenticación

### Crear AuthService

**`src/app/core/services/auth.service.ts`**:
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser$ = new BehaviorSubject<any>(null);

  constructor() {
    // Simular usuario autenticado
    this.currentUser$.next({
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com'
    });
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser$.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    // Llamar API de login
    return new Observable();
  }

  logout(): void {
    this.currentUser$.next(null);
  }
}
```

### Crear Guard

**`src/app/core/guards/auth.guard.ts`**:
```typescript
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    if (user) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
```

## 🎨 Personalizar Colores

**`tailwind.config.js`**:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f4ff',
        100: '#e0e9ff',
        // ... tus colores
        900: '#1e1b4b',
      },
    },
  },
},
```

## 🧪 Agregar Tests

**`src/app/features/nuevo-modulo/nuevo.component.spec.ts`**:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoComponent } from './nuevo.component';
import { NuevoService } from './services/nuevo.service';

describe('NuevoComponent', () => {
  let component: NuevoComponent;
  let fixture: ComponentFixture<NuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoComponent],
      providers: [NuevoService]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load items on init', () => {
    expect(component.items.length).toBeGreaterThan(0);
  });
});
```

Ejecutar:
```bash
npm test
```

## 📦 Crear componente compartido reutilizable

**`src/app/shared/components/custom-button.component.ts`**:
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="onClick.emit()"
      [ngClass]="{
        'bg-primary-600 hover:bg-primary-700': variant === 'primary',
        'border border-gray-300': variant === 'secondary',
        'text-white': variant === 'primary',
        'text-gray-900 dark:text-white': variant === 'secondary'
      }"
      class="px-6 py-3 rounded-lg font-medium transition"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class CustomButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Output() onClick = new EventEmitter<void>();
}
```

Uso:
```html
<app-custom-button variant="primary" (onClick)="handleClick()">
  Click Me
</app-custom-button>
```

---

¡Con esta guía puedes extender el proyecto indefinidamente! 🚀
