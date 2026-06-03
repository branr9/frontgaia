import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '@app/core/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header
      class="fixed top-0 right-0 left-20 md:left-20 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30 transition-all duration-300"
      [ngClass]="{ 'md:left-20': true }"
    >
      <div class="h-full px-6 flex items-center justify-between">
        <!-- Search Bar -->
        <div class="hidden md:flex items-center flex-1 max-w-md">
          <div class="relative w-full">
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Buscar..."
              class="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-4 ml-auto">
          <!-- Notifications -->
          <button
            class="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition group"
            title="Notifications"
          >
            <svg
              class="w-6 h-6 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>
            <span
              class="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"
            ></span>
          </button>

          <!-- Theme Toggle -->
          <button
            (click)="toggleTheme()"
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            [title]="(isDarkMode$ | async) ? 'Light Mode' : 'Dark Mode'"
          >
            <svg
              *ngIf="!(isDarkMode$ | async)"
              class="w-6 h-6 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
            <svg
              *ngIf="isDarkMode$ | async"
              class="w-6 h-6 text-indigo-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              ></path>
            </svg>
          </button>

          <!-- User Profile -->
          <button
            class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <img
              src="https://via.placeholder.com/32"
              alt="User"
              class="w-8 h-8 rounded-full"
            />
            <div class="hidden md:block text-left">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                Admin User
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
            <svg
              class="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  `
})
export class TopbarComponent implements OnInit {
  @Input() isDarkMode = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  isDarkMode$: Observable<boolean>;

  constructor(private themeService: ThemeService) {
    this.isDarkMode$ = this.themeService.isDark();
  }

  ngOnInit(): void {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
