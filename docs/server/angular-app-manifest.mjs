
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-C4WS4TNZ.js",
      "chunk-TPVONSVE.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-KEKIWRHO.js",
      "chunk-R4JYF7NS.js"
    ],
    "route": "/catalog"
  },
  {
    "renderMode": 2,
    "route": "/product"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-OYRRGMZ5.js"
    ],
    "route": "/product/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-Q77HCRE2.js"
    ],
    "route": "/product/create"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-BODMJWJN.js"
    ],
    "route": "/product/edit/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/auth/login",
    "route": "/auth"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-SBZMC5ON.js",
      "chunk-TPVONSVE.js"
    ],
    "route": "/auth/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2OM3YNPO.js",
      "chunk-TPVONSVE.js"
    ],
    "route": "/auth/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XWPE4HEF.js",
      "chunk-TPVONSVE.js",
      "chunk-V45ZNUJT.js"
    ],
    "route": "/auth/forgot-password"
  },
  {
    "renderMode": 2,
    "route": "/user"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-6MOWE4CD.js",
      "chunk-2UFBBHZL.js",
      "chunk-VED2BE7W.js",
      "chunk-V45ZNUJT.js"
    ],
    "route": "/user/profile"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-6MOWE4CD.js",
      "chunk-2UFBBHZL.js",
      "chunk-VED2BE7W.js",
      "chunk-V45ZNUJT.js"
    ],
    "route": "/user/profile/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-RTFGQGNU.js",
      "chunk-TPVONSVE.js",
      "chunk-2UFBBHZL.js",
      "chunk-V45ZNUJT.js"
    ],
    "route": "/user/edit-profile"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-E7DX5BWF.js",
      "chunk-SBLI364R.js",
      "chunk-V45ZNUJT.js"
    ],
    "route": "/user/my-products"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-T7QZGERH.js",
      "chunk-SBLI364R.js",
      "chunk-VED2BE7W.js",
      "chunk-V45ZNUJT.js"
    ],
    "route": "/user/my-purchases"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7TJ52EJF.js",
      "chunk-SBLI364R.js",
      "chunk-R4JYF7NS.js",
      "chunk-V45ZNUJT.js"
    ],
    "route": "/user/favorites"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-GGQ3QFFD.js"
    ],
    "route": "/chat"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-EYCOIV47.js"
    ],
    "route": "/chat/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/moderator/reports",
    "route": "/moderator"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-2JUAVKAY.js",
      "chunk-TPVONSVE.js"
    ],
    "route": "/moderator/reports"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-BKZB6XZL.js",
      "chunk-YFNFOIRG.js"
    ],
    "route": "/moderator/report/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/admin/dashboard",
    "route": "/admin"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-5GLDCZ2S.js"
    ],
    "route": "/admin/dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-BFKTQG3D.js",
      "chunk-YFNFOIRG.js",
      "chunk-TPVONSVE.js"
    ],
    "route": "/admin/users"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7575HQOI.js",
      "chunk-YFNFOIRG.js",
      "chunk-TPVONSVE.js"
    ],
    "route": "/admin/categories"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7QK3FFBA.js"
    ],
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 8785, hash: '601928b6dab8ce105971c8cad5670571006cfba8a810ac14ce9ff73d68c5e3b4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 4088, hash: '7ed03e63ce91be31f8e295fd6fb7cad75f87c165dee3069f12acea950d26e191', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'user/index.html': {size: 255, hash: '5234ad79cf291c29ba8d07c20adde4a3127024cc986f9539e639dc7c44a33e9b', text: () => import('./assets-chunks/user_index_html.mjs').then(m => m.default)},
    'user/my-purchases/index.html': {size: 255, hash: '5234ad79cf291c29ba8d07c20adde4a3127024cc986f9539e639dc7c44a33e9b', text: () => import('./assets-chunks/user_my-purchases_index_html.mjs').then(m => m.default)},
    'chat/index.html': {size: 255, hash: '5234ad79cf291c29ba8d07c20adde4a3127024cc986f9539e639dc7c44a33e9b', text: () => import('./assets-chunks/chat_index_html.mjs').then(m => m.default)},
    'admin/dashboard/index.html': {size: 255, hash: '5234ad79cf291c29ba8d07c20adde4a3127024cc986f9539e639dc7c44a33e9b', text: () => import('./assets-chunks/admin_dashboard_index_html.mjs').then(m => m.default)},
    'admin/categories/index.html': {size: 255, hash: '5234ad79cf291c29ba8d07c20adde4a3127024cc986f9539e639dc7c44a33e9b', text: () => import('./assets-chunks/admin_categories_index_html.mjs').then(m => m.default)},
    'auth/forgot-password/index.html': {size: 33281, hash: '988b3056a732dee0b46da3540533935e4b6aca4e3753b1cfe3391373b7bca8fc', text: () => import('./assets-chunks/auth_forgot-password_index_html.mjs').then(m => m.default)},
    'catalog/index.html': {size: 41757, hash: 'aabd8aed1286e5452f2ffdd005efafad4829c7acf94d1a6f47fad99e91c16134', text: () => import('./assets-chunks/catalog_index_html.mjs').then(m => m.default)},
    'index.html': {size: 38161, hash: '7845031f00e5b88dcc09bb429abe56905e34b6ae1834cd746a105a8a5275379c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'auth/login/index.html': {size: 19116, hash: '2f36e2985fbbca75d570d04a2ee2a0ee9021886c798a1a18a4ce5d6123707570', text: () => import('./assets-chunks/auth_login_index_html.mjs').then(m => m.default)},
    'user/profile/index.html': {size: 255, hash: '5234ad79cf291c29ba8d07c20adde4a3127024cc986f9539e639dc7c44a33e9b', text: () => import('./assets-chunks/user_profile_index_html.mjs').then(m => m.default)},
    'product/index.html': {size: 255, hash: '5234ad79cf291c29ba8d07c20adde4a3127024cc986f9539e639dc7c44a33e9b', text: () => import('./assets-chunks/product_index_html.mjs').then(m => m.default)},
    'moderator/reports/index.html': {size: 255, hash: '5234ad79cf291c29ba8d07c20adde4a3127024cc986f9539e639dc7c44a33e9b', text: () => import('./assets-chunks/moderator_reports_index_html.mjs').then(m => m.default)},
    'admin/users/index.html': {size: 255, hash: '5234ad79cf291c29ba8d07c20adde4a3127024cc986f9539e639dc7c44a33e9b', text: () => import('./assets-chunks/admin_users_index_html.mjs').then(m => m.default)},
    'user/edit-profile/index.html': {size: 255, hash: '5234ad79cf291c29ba8d07c20adde4a3127024cc986f9539e639dc7c44a33e9b', text: () => import('./assets-chunks/user_edit-profile_index_html.mjs').then(m => m.default)},
    'user/my-products/index.html': {size: 255, hash: '5234ad79cf291c29ba8d07c20adde4a3127024cc986f9539e639dc7c44a33e9b', text: () => import('./assets-chunks/user_my-products_index_html.mjs').then(m => m.default)},
    'user/favorites/index.html': {size: 255, hash: '5234ad79cf291c29ba8d07c20adde4a3127024cc986f9539e639dc7c44a33e9b', text: () => import('./assets-chunks/user_favorites_index_html.mjs').then(m => m.default)},
    'auth/register/index.html': {size: 20013, hash: 'bd0c8711d2791d3562f8796e5b5e7811ba9cded202319ea0a9cc5051eb453ad7', text: () => import('./assets-chunks/auth_register_index_html.mjs').then(m => m.default)},
    'styles-KVQLA5P6.css': {size: 234709, hash: 'yRIZzif8Bf0', text: () => import('./assets-chunks/styles-KVQLA5P6_css.mjs').then(m => m.default)}
  },
};
