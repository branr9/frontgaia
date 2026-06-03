# 🏗️ Arquitectura y Best Practices - Gaia

## 📐 Arquitectura General

```
┌─────────────────────────────────────────────────┐
│              APP COMPONENT (Root)                │
└─────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│         LAYOUT COMPONENT (Shell)                 │
│  ┌──────────────────────────────────────────┐  │
│  │       TOPBAR COMPONENT (Header)          │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │                                          │  │
│  │  SIDEBAR        │     ROUTER OUTLET      │  │
│  │  (Navigation)   │    (Feature Pages)     │  │
│  │                 │                        │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────────────────────┐
        ▼           ▼            ▼              ▼
   Dashboard   Financiera  Inscripciones  Puntuación
   (Feature)   (Feature)   (Feature)      (Feature)
```

## 📁 Organización de Carpetas

### Core (Servicios Centrales)
```
core/
├── services/
│   ├── theme.service.ts         # Gestión de tema
│   ├── auth.service.ts          # Autenticación (futuro)
│   ├── error-handler.service.ts # Manejo global de errores
│   └── logger.service.ts        # Logging (futuro)
└── guards/
    ├── auth.guard.ts            # Protección de rutas
    └── admin.guard.ts           # Protección para admins
```

### Layout (Componentes de Shell)
```
layout/
├── components/
│   ├── sidebar.component.ts     # Menú lateral
│   └── topbar.component.ts      # Barra superior
└── layout.component.ts           # Componente contenedor
```

### Shared (Componentes y Servicios Compartidos)
```
shared/
├── components/
│   ├── stat-card.component.ts
│   ├── data-table.component.ts
│   ├── modal.component.ts
│   ├── filter-bar.component.ts
│   └── pagination.component.ts  # Futuro
├── directives/
│   └── highlight.directive.ts   # Ejemplo (futuro)
├── pipes/
│   └── currency.pipe.ts         # Ejemplo (futuro)
└── models/
    └── index.ts                 # Tipos compartidos
```

### Features (Módulos de Funcionalidad)
```
features/
├── dashboard/
│   └── dashboard.component.ts
├── financiera/
│   ├── models/
│   │   └── financial.model.ts
│   ├── services/
│   │   └── financial.service.ts
│   └── financiera.component.ts
├── inscripciones/
│   ├── models/
│   │   └── inscription.model.ts
│   ├── services/
│   │   └── inscription.service.ts
│   └── inscripciones.component.ts
├── puntuacion/
├── identificacion-auxilio/
└── configuracion/
```

## 🎯 Principios de Diseño

### 1. Single Responsibility Principle (SRP)
Cada componente/servicio tiene una única responsabilidad:

```typescript
// ❌ MAL - Componente hace demasiado
export class FinancieraComponent {
  loadData() { /* ...carga de datos */ }
  renderUI() { /* ...renderiza */ }
  saveData() { /* ...guarda */ }
  handleErrors() { /* ...maneja errores */ }
  formatCurrency() { /* ...formatea */ }
}

// ✅ BIEN - Componente enfocado
export class FinancieraComponent {
  constructor(
    private service: FinancialService,
    private currencyPipe: CurrencyPipe
  ) {}
  // Solo presenta datos
}
```

### 2. Dependency Injection
Inyectar dependencias en lugar de crearlas:

```typescript
// ❌ MAL
export class FinancieraComponent {
  service = new FinancialService(); // Creación directa
}

// ✅ BIEN
export class FinancieraComponent {
  constructor(private service: FinancialService) {} // Inyección
}
```

### 3. Reactive Programming (RxJS)
Usar observables para manejo asincrónico:

```typescript
// ❌ MAL - Callbacks
getUser(id: string, callback: (user) => void) {
  setTimeout(() => callback(user), 1000);
}

// ✅ BIEN - Observable
getUser(id: string): Observable<User> {
  return of(user).pipe(delay(1000));
}
```

### 4. Smart vs Presentational Components

**Smart Components (Container)**
- Manejan lógica
- Se conectan a servicios
- Manejan estado

```typescript
export class FinancieraComponent {
  records$ = this.service.getRecords();
  
  saveRecord(record: FinancialRecord) {
    this.service.save(record).subscribe(...);
  }
}
```

**Presentational Components (Dumb)**
- Solo muestran datos
- Reciben inputs
- Emiten outputs

```typescript
export class StatCardComponent {
  @Input() config!: CardConfig;
  @Output() onClick = new EventEmitter();
}
```

### 5. Type Safety (TypeScript)
Siempre usar tipos explícitos:

```typescript
// ❌ MAL - Tipos implícitos
records = [];
result = this.service.getRecords();

// ✅ BIEN - Tipos explícitos
records: FinancialRecord[] = [];
result$: Observable<FinancialRecord[]>;
```

## 🔄 Patrones Comunes

### Patrón Observable Async Pipe
Usar `async` pipe en lugar de suscripciones manuales:

```typescript
// Componente
records$ = this.service.getRecords();

// Template
<app-data-table
  [config]="{ data: records$ | async }"
></app-data-table>
```

**Ventajas**:
- Unsubscribe automático
- Change detection integrado
- Menos boilerplate

### Patrón RxJS Operators
Transformar datos con operators:

```typescript
records$ = this.service.getRecords().pipe(
  map(records => records.filter(r => r.status === 'active')),
  catchError(error => {
    console.error(error);
    return of([]);
  })
);
```

### Patrón Smart Component
Contiene toda la lógica:

```typescript
export class FinancieraComponent implements OnInit {
  records: FinancialRecord[] = [];
  isLoading = false;

  constructor(private service: FinancialService) {}

  ngOnInit() {
    this.loadRecords();
  }

  loadRecords() {
    this.isLoading = true;
    this.service.getRecords().subscribe({
      next: (data) => {
        this.records = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }
}
```

## 📐 Estructura de un Servicio

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  private apiUrl = '/api/items';
  
  // Estado compartido
  private itemsSubject = new BehaviorSubject<MyItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadItems();
  }

  // GET - Lectura
  getItems(): Observable<MyItem[]> {
    return this.http.get<MyItem[]>(this.apiUrl).pipe(
      tap(items => this.itemsSubject.next(items)),
      catchError(error => this.handleError(error))
    );
  }

  // POST - Crear
  createItem(item: Omit<MyItem, 'id'>): Observable<MyItem> {
    return this.http.post<MyItem>(this.apiUrl, item).pipe(
      tap(newItem => {
        const current = this.itemsSubject.value;
        this.itemsSubject.next([newItem, ...current]);
      }),
      catchError(error => this.handleError(error))
    );
  }

  // PUT - Actualizar
  updateItem(id: string, item: Partial<MyItem>): Observable<MyItem> {
    return this.http.put<MyItem>(`${this.apiUrl}/${id}`, item).pipe(
      tap(updated => {
        const current = this.itemsSubject.value;
        const index = current.findIndex(i => i.id === id);
        if (index !== -1) {
          current[index] = updated;
          this.itemsSubject.next([...current]);
        }
      }),
      catchError(error => this.handleError(error))
    );
  }

  // DELETE - Eliminar
  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const current = this.itemsSubject.value;
        this.itemsSubject.next(current.filter(i => i.id !== id));
      }),
      catchError(error => this.handleError(error))
    );
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Error:', error);
    throw new Error(`Error: ${error.message}`);
  }

  // Cargar datos al inicializar
  private loadItems(): void {
    this.getItems().subscribe();
  }
}
```

## 🧪 Testing Strategy

### Unit Tests (Componentes)
```typescript
describe('FinancieraComponent', () => {
  let component: FinancieraComponent;
  let fixture: ComponentFixture<FinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancieraComponent],
      providers: [FinancialService]
    }).compileComponents();

    fixture = TestBed.createComponent(FinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load records on init', () => {
    expect(component.records.length).toBeGreaterThan(0);
  });

  it('should save record', () => {
    const newRecord = { /* ... */ };
    component.saveRecord(newRecord);
    expect(component.records).toContain(newRecord);
  });
});
```

### Integration Tests (Servicios)
```typescript
describe('FinancialService', () => {
  let service: FinancialService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinancialService]
    });

    service = TestBed.inject(FinancialService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch records', () => {
    service.getRecords().subscribe(records => {
      expect(records.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne('/api/records');
    expect(req.request.method).toBe('GET');
    req.flush([/* mock data */]);
  });
});
```

## 🔍 Code Style

### Nomenclatura
```typescript
// Componentes
✅ financiera.component.ts
❌ FinancieraComponent.ts

// Servicios
✅ financial.service.ts
❌ FinancialServiceService.ts

// Directives
✅ highlight.directive.ts

// Pipes
✅ currency.pipe.ts

// Variables
✅ isLoading = false
✅ recordsData: Record[]
❌ data, d, rec

// Métodos
✅ loadRecords()
✅ saveRecord(record)
❌ lr(), sr(r)

// Observables
✅ records$ = this.service.getRecords()
❌ records = this.service.getRecords()
```

### Imports
Ordenar y agrupar:
```typescript
// 1. Angular imports
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// 2. Terceros
import { NgxSpinnerModule } from 'ngx-spinner';

// 3. App imports
import { FinancialService } from './services/financial.service';
import { FinancialRecord } from './models/financial.model';

// 4. Relativos
import { DataTableComponent } from './components/data-table';
```

## 🚀 Performance Tips

### Change Detection OnPush
```typescript
@Component({
  selector: 'app-stat-card',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatCardComponent {
  @Input() config!: CardConfig;
}
```

### Unsubscribe Pattern
```typescript
export class MyComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.service.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.items = items;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### TrackBy en *ngFor
```typescript
// ❌ MAL - Recrea elementos
<div *ngFor="let item of items">{{ item.name }}</div>

// ✅ BIEN - Reutiliza elementos
<div *ngFor="let item of items; trackBy: trackByFn">
  {{ item.name }}
</div>

trackByFn(index: number, item: MyItem): string {
  return item.id;
}
```

---

Seguir estos principios asegura un código escalable, mantenible y de alta calidad. 🎯
