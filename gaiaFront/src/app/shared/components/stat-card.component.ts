import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CardConfig {
  title: string;
  value: string | number;
  icon?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  subtitle?: string;
}

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-soft hover:shadow-medium transition-shadow"
    >
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <p class="text-gray-600 dark:text-gray-400 text-sm font-medium">
            {{ config.title }}
          </p>
          <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {{ config.value }}
          </p>
          <p
            *ngIf="config.subtitle"
            class="text-gray-500 dark:text-gray-400 text-xs mt-1"
          >
            {{ config.subtitle }}
          </p>
        </div>
        <div
          *ngIf="config.icon"
          [ngClass]="getIconColors()"
          class="w-12 h-12 rounded-lg flex items-center justify-center"
        >
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path [attr.d]="getIconPath(config.icon)"></path>
          </svg>
        </div>
      </div>

      <!-- Trend Indicator -->
      <div *ngIf="config.trend" class="mt-4 flex items-center gap-1">
        <svg
          class="w-4 h-4"
          [ngClass]="
            config.trend.direction === 'up'
              ? 'text-green-500'
              : 'text-red-500'
          "
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            *ngIf="config.trend.direction === 'up'"
            d="M7 16.5l3-3m0 0l3-3m-3 3L7 10m3 3l3-3"
          ></path>
          <path
            *ngIf="config.trend.direction === 'down'"
            d="M7 7.5l3 3m0 0l3 3m-3-3l-3 3"
          ></path>
        </svg>
        <span
          [ngClass]="
            config.trend.direction === 'up'
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          "
          class="text-sm font-medium"
        >
          {{ config.trend.value }}%
        </span>
      </div>
    </div>
  `
})
export class StatCardComponent {
  @Input() config!: CardConfig;

  getIconColors(): string {
    const colorMap: Record<string, string> = {
      primary: 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400',
      secondary: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
      success: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
      warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400',
      error: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
    };
    return colorMap[this.config.color || 'primary'];
  }

  getIconPath(icon: string): string {
    const icons: Record<string, string> = {
      chart: 'M13 7H7v12h6V7zm0-2h-6a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2zm6-2h-2v10h2V3zm0 12h-2v2h2v-2z',
      users: 'M12 4.354a4 4 0 110 8.008 4 4 0 010-8.008zM9 9a3 3 0 106 0 3 3 0 00-6 0z',
      money: 'M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0-2C6.48 6 2 8.24 2 11s4.48 5 10 5 10-2.24 10-5-4.48-5-10-5zm0 9c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z',
      trending: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18 9.41 12l4 4 6.3-6.29L22 12v-6z'
    };
    return icons[icon] || icons['chart'];
  }
}
