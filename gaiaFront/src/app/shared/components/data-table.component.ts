import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  type?: 'text' | 'date' | 'number' | 'status' | 'actions';
}

export interface TableConfig {
  columns: TableColumn[];
  data: any[];
  loading?: boolean;
  paginated?: boolean;
  pageSize?: number;
  currentPage?: number;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-soft overflow-hidden">
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <!-- Header -->
          <thead class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th *ngFor="let col of config.columns" 
                  [ngClass]="col.width"
                  class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                <div class="flex items-center gap-2">
                  {{ col.label }}
                  <svg *ngIf="col.sortable" class="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4"></path>
                  </svg>
                </div>
              </th>
              <th class="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">Acciones</th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr *ngIf="config.loading" class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              <td [attr.colspan]="config.columns.length + 1" class="px-6 py-8 text-center">
                <div class="flex items-center justify-center gap-2">
                  <svg class="animate-spin w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Cargando...</span>
                </div>
              </td>
            </tr>

            <tr *ngIf="!config.loading && config.data.length === 0" class="bg-white dark:bg-gray-800">
              <td [attr.colspan]="config.columns.length + 1" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                <p class="text-sm">No hay datos disponibles</p>
              </td>
            </tr>

            <tr *ngFor="let row of config.data" class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <td *ngFor="let col of config.columns" class="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                <div [ngSwitch]="col.type">
                  <!-- Text -->
                  <span *ngSwitchCase="'text'" class="font-medium">{{ row[col.key] }}</span>

                  <!-- Date -->
                  <span *ngSwitchCase="'date'" class="text-gray-600 dark:text-gray-400">
                    {{ row[col.key] | date: 'dd/MM/yyyy' }}
                  </span>

                  <!-- Number -->
                  <span *ngSwitchCase="'number'" class="font-semibold text-primary-600 dark:text-primary-400">
                    {{ row[col.key] | number: '1.0-0' }}
                  </span>

                  <!-- Status -->
                  <span *ngSwitchCase="'status'" 
                        [ngClass]="getStatusClass(row[col.key])"
                        class="px-3 py-1 rounded-full text-xs font-medium">
                    {{ row[col.key] }}
                  </span>

                  <!-- Default -->
                  <span *ngSwitchDefault>{{ row[col.key] }}</span>
                </div>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button (click)="onView.emit(row)" 
                          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition" 
                          title="Ver">
                    <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button (click)="onEdit.emit(row)" 
                          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition" 
                          title="Editar">
                    <svg class="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button (click)="onDelete.emit(row)" 
                          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition" 
                          title="Eliminar">
                    <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3H4v2h16V7h-2.5z"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div *ngIf="config.paginated" class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <span class="text-sm text-gray-600 dark:text-gray-400">
          Página {{ config.currentPage || 1 }} de {{ totalPages }}
        </span>
        <div class="flex gap-2">
          <button class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium">
            Anterior
          </button>
          <button class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  `
})
export class DataTableComponent implements OnInit {
  @Input() config!: TableConfig;
  @Output() onView = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  totalPages = 1;

  ngOnInit(): void {
    if (this.config.paginated && this.config.pageSize) {
      this.totalPages = Math.ceil(this.config.data.length / this.config.pageSize);
    }
  }

  getStatusClass(status: string): string {
    const statusMap: Record<string, string> = {
      'active': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      'pending': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      'completed': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      'cancelled': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
      'rejected': 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
      'approved': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      'inactive': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
      'overdue': 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
      'paid': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
    };
    return statusMap[status.toLowerCase()] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
  }
}
