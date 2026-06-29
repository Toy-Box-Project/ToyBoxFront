import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'product/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'user/profile/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'product/edit/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'chat/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'moderator/report/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
