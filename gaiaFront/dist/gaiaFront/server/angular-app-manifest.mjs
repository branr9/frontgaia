
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/financiera"
  },
  {
    "renderMode": 2,
    "route": "/inscripciones"
  },
  {
    "renderMode": 2,
    "route": "/puntuacion"
  },
  {
    "renderMode": 2,
    "route": "/identificacion-auxilio"
  },
  {
    "renderMode": 2,
    "route": "/configuracion"
  },
  {
    "renderMode": 2,
    "redirectTo": "/dashboard",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 2643, hash: '7038c8fc5db86b48c27b7876d151e00e15df32738e000acd8d40aec7fd884bfc', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 947, hash: 'bae5cd33a6253e6102770e2c29a874c169e0d08edf0bf637f42636fd636d68e5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 252, hash: '70fded1a23c1727b8dbdfae3b840cf7bca033e0a34323a24cbab74440942707a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'configuracion/index.html': {size: 25296, hash: 'f6fbe6ed3ccc0dd9a4fd1a2f932cef1c32857033506055d93ffdf3a2f4b4cb94', text: () => import('./assets-chunks/configuracion_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 26827, hash: 'b9fdeae15c54dad0f30a3631a2d3b77ae2fc158e2141b01612007c3120586aae', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'financiera/index.html': {size: 25285, hash: 'd7a1d1baf4df21f052f5801338c9311612baec7e733cfb0994fd60630d4dd1aa', text: () => import('./assets-chunks/financiera_index_html.mjs').then(m => m.default)},
    'puntuacion/index.html': {size: 25287, hash: 'a862269517adce7ad21121e82d597c703754b2cd4ef4ff6340ea9bbf824d9fed', text: () => import('./assets-chunks/puntuacion_index_html.mjs').then(m => m.default)},
    'identificacion-auxilio/index.html': {size: 25323, hash: '45f06b17b49b09870b5eaf06314589f6aee8c988717e1bb3c556e173e67e081a', text: () => import('./assets-chunks/identificacion-auxilio_index_html.mjs').then(m => m.default)},
    'inscripciones/index.html': {size: 25289, hash: '741cdebc9b2257849b9a3152d8c9feb0cec6b683b4ec3c422302079da87e8ab4', text: () => import('./assets-chunks/inscripciones_index_html.mjs').then(m => m.default)},
    'styles-PJZREKGC.css': {size: 26877, hash: '023roLRO8yM', text: () => import('./assets-chunks/styles-PJZREKGC_css.mjs').then(m => m.default)}
  },
};
