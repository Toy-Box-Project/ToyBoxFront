
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/ToyBoxFront/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-C4WS4TNZ.js",
      "chunk-TPVONSVE.js"
    ],
    "route": "/ToyBoxFront"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KEKIWRHO.js",
      "chunk-R4JYF7NS.js"
    ],
    "route": "/ToyBoxFront/catalog"
  },
  {
    "renderMode": 2,
    "route": "/ToyBoxFront/product"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-OYRRGMZ5.js"
    ],
    "route": "/ToyBoxFront/product/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-Q77HCRE2.js"
    ],
    "route": "/ToyBoxFront/product/create"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-BODMJWJN.js"
    ],
    "route": "/ToyBoxFront/product/edit/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/ToyBoxFront/auth/login",
    "route": "/ToyBoxFront/auth"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-SBZMC5ON.js",
      "chunk-TPVONSVE.js"
    ],
    "route": "/ToyBoxFront/auth/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2OM3YNPO.js",
      "chunk-TPVONSVE.js"
    ],
    "route": "/ToyBoxFront/auth/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XWPE4HEF.js",
      "chunk-TPVONSVE.js",
      "chunk-V45ZNUJT.js"
    ],
    "route": "/ToyBoxFront/auth/forgot-password"
  },
  {
    "renderMode": 2,
    "route": "/ToyBoxFront/user"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6MOWE4CD.js",
      "chunk-2UFBBHZL.js",
      "chunk-VED2BE7W.js",
      "chunk-V45ZNUJT.js"
    ],
    "route": "/ToyBoxFront/user/profile"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-6MOWE4CD.js",
      "chunk-2UFBBHZL.js",
      "chunk-VED2BE7W.js",
      "chunk-V45ZNUJT.js"
    ],
    "route": "/ToyBoxFront/user/profile/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-RTFGQGNU.js",
      "chunk-TPVONSVE.js",
      "chunk-2UFBBHZL.js",
      "chunk-V45ZNUJT.js"
    ],
    "route": "/ToyBoxFront/user/edit-profile"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-E7DX5BWF.js",
      "chunk-SBLI364R.js",
      "chunk-V45ZNUJT.js"
    ],
    "route": "/ToyBoxFront/user/my-products"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-T7QZGERH.js",
      "chunk-SBLI364R.js",
      "chunk-VED2BE7W.js",
      "chunk-V45ZNUJT.js"
    ],
    "route": "/ToyBoxFront/user/my-purchases"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7TJ52EJF.js",
      "chunk-SBLI364R.js",
      "chunk-R4JYF7NS.js",
      "chunk-V45ZNUJT.js"
    ],
    "route": "/ToyBoxFront/user/favorites"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-GGQ3QFFD.js"
    ],
    "route": "/ToyBoxFront/chat"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-EYCOIV47.js"
    ],
    "route": "/ToyBoxFront/chat/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/ToyBoxFront/moderator/reports",
    "route": "/ToyBoxFront/moderator"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2JUAVKAY.js",
      "chunk-TPVONSVE.js"
    ],
    "route": "/ToyBoxFront/moderator/reports"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-BKZB6XZL.js",
      "chunk-YFNFOIRG.js"
    ],
    "route": "/ToyBoxFront/moderator/report/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/ToyBoxFront/admin/dashboard",
    "route": "/ToyBoxFront/admin"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5GLDCZ2S.js"
    ],
    "route": "/ToyBoxFront/admin/dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BFKTQG3D.js",
      "chunk-YFNFOIRG.js",
      "chunk-TPVONSVE.js"
    ],
    "route": "/ToyBoxFront/admin/users"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7575HQOI.js",
      "chunk-YFNFOIRG.js",
      "chunk-TPVONSVE.js"
    ],
    "route": "/ToyBoxFront/admin/categories"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7QK3FFBA.js"
    ],
    "route": "/ToyBoxFront/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 8797, hash: 'f0f24d49dea0ee57cd45810d66456bcf5375d5f98e472ac35fd10bbbb1252c63', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 4100, hash: '896b3a599f865d88536850c758aa5583ee2afb6500d1e2435a916cf5f68fe538', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'user/index.html': {size: 291, hash: 'b000f051a8316ed61673bb2dcbea2c0c9f2e92da3bf9baad56e196b936633147', text: () => import('./assets-chunks/user_index_html.mjs').then(m => m.default)},
    'user/my-purchases/index.html': {size: 291, hash: 'b000f051a8316ed61673bb2dcbea2c0c9f2e92da3bf9baad56e196b936633147', text: () => import('./assets-chunks/user_my-purchases_index_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 291, hash: 'b000f051a8316ed61673bb2dcbea2c0c9f2e92da3bf9baad56e196b936633147', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'admin/dashboard/index.html': {size: 291, hash: 'b000f051a8316ed61673bb2dcbea2c0c9f2e92da3bf9baad56e196b936633147', text: () => import('./assets-chunks/admin_dashboard_index_html.mjs').then(m => m.default)},
    'admin/categories/index.html': {size: 291, hash: 'b000f051a8316ed61673bb2dcbea2c0c9f2e92da3bf9baad56e196b936633147', text: () => import('./assets-chunks/admin_categories_index_html.mjs').then(m => m.default)},
    'auth/forgot-password/index.html': {size: 33497, hash: '9f01c985826eba68741b783ed510b75b300aaff95c5e9cee3fb14045ba2623d2', text: () => import('./assets-chunks/auth_forgot-password_index_html.mjs').then(m => m.default)},
    'index.html': {size: 38173, hash: '10f6c641dbbc0a3ec66aa766e3dbb085e0677c675ee83f000df140aa676521bb', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'user/profile/index.html': {size: 291, hash: 'b000f051a8316ed61673bb2dcbea2c0c9f2e92da3bf9baad56e196b936633147', text: () => import('./assets-chunks/user_profile_index_html.mjs').then(m => m.default)},
    'moderator/reports/index.html': {size: 291, hash: 'b000f051a8316ed61673bb2dcbea2c0c9f2e92da3bf9baad56e196b936633147', text: () => import('./assets-chunks/moderator_reports_index_html.mjs').then(m => m.default)},
    'catalog/index.html': {size: 41769, hash: 'df6751c7c29bfba2652a4bf8dfbc15430a578035497131217f7f7016a19db2e7', text: () => import('./assets-chunks/catalog_index_html.mjs').then(m => m.default)},
    'product/index.html': {size: 291, hash: 'b000f051a8316ed61673bb2dcbea2c0c9f2e92da3bf9baad56e196b936633147', text: () => import('./assets-chunks/product_index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 19128, hash: 'f59987cf4538e9deacfed49288c8a3eeb766e98bd59907924c22a444c81086e0', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 291, hash: 'b000f051a8316ed61673bb2dcbea2c0c9f2e92da3bf9baad56e196b936633147', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'user/my-products/index.html': {size: 291, hash: 'b000f051a8316ed61673bb2dcbea2c0c9f2e92da3bf9baad56e196b936633147', text: () => import('./assets-chunks/user_my-products_index_html.mjs').then(m => m.default)},
    'user/edit-profile/index.html': {size: 291, hash: 'b000f051a8316ed61673bb2dcbea2c0c9f2e92da3bf9baad56e196b936633147', text: () => import('./assets-chunks/user_edit-profile_index_html.mjs').then(m => m.default)},
    'user/favorites/index.html': {size: 291, hash: 'b000f051a8316ed61673bb2dcbea2c0c9f2e92da3bf9baad56e196b936633147', text: () => import('./assets-chunks/user_favorites_index_html.mjs').then(m => m.default)},
    'auth/register/index.html': {size: 20025, hash: '1a5544fb03a44d39fb4c20f827d6d4b247abaa561dc45381c9dfcf0d7fe97332', text: () => import('./assets-chunks/auth_register_index_html.mjs').then(m => m.default)},
    'styles-KVQLA5P6.css': {size: 234709, hash: 'yRIZzif8Bf0', text: () => import('./assets-chunks/styles-KVQLA5P6_css.mjs').then(m => m.default)}
  },
};
