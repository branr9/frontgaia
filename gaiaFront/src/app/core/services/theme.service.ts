import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode$ = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    const initialTheme = this.getInitialTheme();
    this.isDarkMode$.next(initialTheme);
    this.applyTheme(initialTheme);
  }

  isDark(): Observable<boolean> {
    return this.isDarkMode$.asObservable();
  }

  toggleTheme(): void {
    const newValue = !this.isDarkMode$.value;
    this.isDarkMode$.next(newValue);
    this.applyTheme(newValue);
    if (this.isBrowser()) {
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
    }
  }

  setTheme(isDark: boolean): void {
    this.isDarkMode$.next(isDark);
    this.applyTheme(isDark);
    if (this.isBrowser()) {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }

  private getInitialTheme(): boolean {
    if (!this.isBrowser()) {
      return false;
    }

    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private applyTheme(isDark: boolean): void {
    if (!this.isBrowser()) {
      return;
    }

    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
