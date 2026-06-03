import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatCardComponent } from './components/stat-card.component';
import { DataTableComponent } from './components/data-table.component';
import { ModalComponent } from './components/modal.component';
import { FilterBarComponent } from './components/filter-bar.component';

@NgModule({
  declarations: [
    StatCardComponent,
    DataTableComponent,
    ModalComponent,
    FilterBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StatCardComponent,
    DataTableComponent,
    ModalComponent,
    FilterBarComponent
  ]
})
export class SharedModule { }
