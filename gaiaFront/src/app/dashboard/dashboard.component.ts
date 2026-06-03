import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <section class="space-y-6">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Panel principal del sistema administrativo Gaia.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <article class="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <p class="text-sm text-gray-500 dark:text-gray-400">Inscripciones</p>
          <p class="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">0</p>
        </article>
        <article class="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <p class="text-sm text-gray-500 dark:text-gray-400">Financiera</p>
          <p class="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">0</p>
        </article>
        <article class="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <p class="text-sm text-gray-500 dark:text-gray-400">Puntuacion</p>
          <p class="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">0</p>
        </article>
      </div>
    </section>
  `
})
export class DashboardComponent {}
