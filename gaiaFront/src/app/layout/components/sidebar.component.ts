import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '@app/shared/models';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside
      class="fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40"
      [ngClass]="isCollapsed ? 'w-20' : 'w-64'"
    >
      <!-- Logo -->
      <div class="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <div *ngIf="!isCollapsed" class="flex items-center gap-2">
          <div
            class="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center text-white font-bold"
          >
            G
          </div>
          <span class="font-bold text-gray-900 dark:text-white">Gaia</span>
        </div>
        <button
          (click)="onToggleCollapse()"
          class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          title="Toggle sidebar"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Menu Items -->
      <nav class="mt-4 px-2 space-y-1">
        <ng-container *ngFor="let item of menuItems">
          <a
            *ngIf="!item.children"
            [routerLink]="item.route"
            routerLinkActive="bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400 border-l-4 border-primary-600"
            [routerLinkActiveOptions]="{ exact: true }"
            class="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition group relative"
            [title]="isCollapsed ? item.label : ''"
          >
            <svg
              class="w-6 h-6 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                [attr.d]="getIconPath(item.icon)"
              ></path>
            </svg>
            <span *ngIf="!isCollapsed" class="flex-1">{{ item.label }}</span>
            <span
              *ngIf="item.badge && !isCollapsed"
              class="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
            >
              {{ item.badge }}
            </span>
            <!-- Tooltip for collapsed state -->
            <div
              *ngIf="isCollapsed"
              class="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 pointer-events-none"
            >
              {{ item.label }}
            </div>
          </a>

          <!-- Submenu dropdown (future implementation) -->
          <div *ngIf="item.children" class="relative">
            <button
              class="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              [title]="isCollapsed ? item.label : ''"
            >
              <svg
                class="w-6 h-6 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  [attr.d]="getIconPath(item.icon)"
                ></path>
              </svg>
              <span *ngIf="!isCollapsed" class="flex-1">{{ item.label }}</span>
            </button>
          </div>
        </ng-container>
      </nav>

      <!-- Bottom Section -->
      <div class="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 p-4">
        <button
          class="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          [title]="isCollapsed ? 'Settings' : ''"
        >
          <svg
            class="w-6 h-6 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span *ngIf="!isCollapsed">Settings</span>
        </button>
      </div>
    </aside>
  `,
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed = false;
  @Output() toggleCollapse = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      id: 'financiera',
      label: 'Financiera',
      icon: 'finance',
      route: '/financiera'
    },
    {
      id: 'inscripciones',
      label: 'Inscripciones',
      icon: 'users',
      route: '/inscripciones'
    },
    {
      id: 'puntuacion',
      label: 'Puntuación',
      icon: 'chart',
      route: '/puntuacion'
    },
    {
      id: 'auxilio',
      label: 'Identificación de Auxilio',
      icon: 'hand',
      route: '/identificacion-auxilio'
    },
    {
      id: 'config',
      label: 'Configuración',
      icon: 'settings',
      route: '/configuracion'
    }
  ];

  ngOnInit(): void {}

  onToggleCollapse(): void {
    this.toggleCollapse.emit();
  }

  getIconPath(iconName: string): string {
    const icons: Record<string, string> = {
      dashboard:
        'M3 12a9 9 0 1118 0 9 9 0 01-18 0zm9-9v18m9-9H3',
      finance:
        'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      users:
        'M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 14H8m0 0H5m9 0a5 5 0 01-10 0',
      chart:
        'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      hand:
        'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2-1m0 0l-2 1m2-1v2.5M14 4l-2-1m0 0l-2 1m2-1v2.5m-2-4l-2-1m0 0l-2 1m2-1v2.5',
      settings:
        'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
    };
    return icons[iconName] || icons['dashboard'];
  }
}
