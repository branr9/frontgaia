import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterField {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'range';
  options?: Array<{ label: string; value: any }>;
}

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-soft p-4">
      <div class="flex items-center gap-4 flex-wrap">
        <!-- Filter Fields -->
        <ng-container *ngFor="let field of fields">
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ field.label }}
            </label>
            
            <!-- Text Input -->
            <input 
              *ngIf="field.type === 'text'"
              type="text"
              [(ngModel)]="filterValues[field.key]"
              (change)="onFilterChange()"
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              [placeholder]="'Buscar ' + field.label"
            />

            <!-- Select -->
            <select 
              *ngIf="field.type === 'select'"
              [(ngModel)]="filterValues[field.key]"
              (change)="onFilterChange()"
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option [value]="">Todos</option>
              <option *ngFor="let opt of field.options" [value]="opt.value">
                {{ opt.label }}
              </option>
            </select>

            <!-- Date Input -->
            <input 
              *ngIf="field.type === 'date'"
              type="date"
              [(ngModel)]="filterValues[field.key]"
              (change)="onFilterChange()"
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </ng-container>

        <!-- Reset Button -->
        <div class="flex items-end">
          <button
            (click)="resetFilters()"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  `
})
export class FilterBarComponent {
  @Input() fields: FilterField[] = [];
  @Output() onFilter = new EventEmitter<Record<string, any>>();

  filterValues: Record<string, any> = {};

  onFilterChange(): void {
    this.onFilter.emit(this.filterValues);
  }

  resetFilters(): void {
    this.filterValues = {};
    this.onFilter.emit(this.filterValues);
  }
}
