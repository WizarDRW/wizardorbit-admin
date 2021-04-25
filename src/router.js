import Vue from "vue";
import Router from "vue-router";
import store from '@/core/services/store/store'
import { CURRENT_USER } from "@/core/services/store/auth.module";

Vue.use(Router);

function isAuth(to, from, next) {
  store.dispatch('verifyAuth');
  if (!store.getters['isAuthenticated']) {
    next({ name: 'Login' });
  } else next();
}
function isForbidden(role, to, from, next) {
  store
    .dispatch(CURRENT_USER).then(x => {
      if (x._doc.role == role || x._doc.role == 'SuperUser') {
        next();
      } else
        next({ name: "Forbidden" })
    })
}
export default new Router({
  mode: "history",
  linkExactActiveClass: "active",
  routes: [
    {
      path: '/auth/:token',
      name: 'auth',
      beforeEnter: async (to, from, next) => {
        if (to.params.token) {
          localStorage.clear();
          localStorage.setItem("id_token", to.params.token);
          store.dispatch('verifyAuth');
          if (!store.getters['isAuthenticated']) {
            next({ name: "Home" })
          }else next({ name: "Login" })
        }
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import("./views/auth/Login.vue"),
    },
    {
      path: '/',
      name: 'Home',
      meta: { description: 'Ev' },
      redirect: '/dashboard',
      beforeEnter: (to, from, next) => isAuth(to, from, next),
      component: () => import("./layouts/Container.vue"),
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          beforeEnter: (to, from, next) => isAuth(to, from, next),
          component: () => import('./views/dashboard/Index.vue')
        },
        {
          path: '/blog',
          name: 'Blog',
          meta: { description: 'Blog' },
          redirect: '/myblogs',
          beforeEnter: (to, from, next) => isAuth(to, from, next),
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/newblog',
              name: 'NewBlog',
              meta: { description: 'Yeni' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/blog/Create.vue")
            },
            {
              path: '/myblogs',
              name: 'MyBlog',
              meta: { description: 'Bloglarım' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/blog/List.vue")
            },
            {
              path: '/blog/edit/:id',
              name: 'EditBlog',
              meta: { description: 'Düzenle' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/blog/Edit.vue"),
            },
            {
              path: '/blog/detail/:id',
              name: 'DetailBlog',
              meta: { description: 'Detay' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/blog/Detail.vue")
            }
          ]
        },
        {
          path: '/news',
          name: 'News',
          meta: { description: 'Haberler' },
          redirect: '/my-news',
          beforeEnter: (to, from, next) => isAuth(to, from, next),
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/new-news',
              name: 'New-News',
              meta: { description: 'Yeni' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/news/Create.vue")
            },
            {
              path: '/my-news',
              name: 'MyNews',
              meta: { description: 'Haberlerim' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/news/List.vue")
            },
            {
              path: '/news/edit/:id',
              name: 'EditNews',
              meta: { description: 'Düzenle' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/news/Edit.vue"),
            },
            {
              path: '/news/detail/:id',
              name: 'DetailNews',
              meta: { description: 'Detay' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/news/Detail.vue")
            }
          ]
        },
        {
          path: '/form',
          name: 'Form',
          meta: { description: 'Forum' },
          redirect: '/my-form',
          beforeEnter: (to, from, next) => isAuth(to, from, next),
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/new-form',
              name: 'NewForm',
              meta: { description: 'Yeni' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/form/Create.vue")
            },
            {
              path: '/my-form',
              name: 'MyForm',
              meta: { description: 'Forumlarım' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/form/List.vue")
            },
            {
              path: '/form/edit/:id',
              name: 'EditForm',
              meta: { description: 'Düzenle' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/form/Edit.vue"),
            },
            {
              path: '/form/detail/:id',
              name: 'DetailForm',
              meta: { description: 'Detay' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/form/Detail.vue")
            }
          ]
        },
        {
          path: '/admin/blog',
          name: 'AdminBlog',
          meta: { description: 'Yönetim Bloğu' },
          redirect: '/admin/myblogs',
          beforeEnter: (to, from, next) => {
            isAuth(to, from, next);
            isForbidden('Admin', to, from, next);
          },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/admin/newblog',
              name: 'AdminNewBlog',
              meta: { description: 'Yeni' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/blog/Create.vue")
            },
            {
              path: '/admin/myblogs',
              name: 'AdminBlogs',
              meta: { description: 'Bloglar' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/blog/List.vue")
            },
            {
              path: '/admin/blog/edit/:id',
              name: 'AdminEditBlog',
              meta: { description: 'Düzenle' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/blog/Edit.vue"),
            },
            {
              path: '/admin/blog/detail/:id',
              name: 'AdminDetailBlog',
              meta: { description: 'Detay' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/blog/Detail.vue")
            }
          ]
        },
        {
          path: '/admin/news',
          name: 'AdminNews',
          meta: { description: 'Yönetici Haberleri' },
          redirect: '/admin/my-news',
          beforeEnter: (to, from, next) => isAuth(to, from, next),
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/admin/new-news',
              name: 'AdminNew-News',
              meta: { description: 'Yeni' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/news/Create.vue")
            },
            {
              path: '/admin/my-news',
              name: 'Admin-News',
              meta: { description: 'Haberler' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/news/List.vue")
            },
            {
              path: '/admin/news/edit/:id',
              name: 'AdminEditNews',
              meta: { description: 'Düzenle' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/news/Edit.vue"),
            },
            {
              path: '/admin/news/detail/:id',
              name: 'AdminDetailNews',
              meta: { description: 'Detay' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/news/Detail.vue")
            }
          ]
        },
        {
          path: '/admin/form',
          name: 'AdminForm',
          meta: { description: 'Yönetici Forumu' },
          redirect: '/admin/my-form',
          beforeEnter: (to, from, next) => {
            isAuth(to, from, next);
            isForbidden('Admin', to, from, next);
          },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/admin/new-form',
              name: 'AdminNewForm',
              meta: { description: 'Yeni' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/form/Create.vue")
            },
            {
              path: '/admin/my-form',
              name: 'AdminForms',
              meta: { description: 'Forumlar' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/form/List.vue")
            },
            {
              path: '/admin/form/edit/:id',
              name: 'AdminEditForm',
              meta: { description: 'Düzenle' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/form/Edit.vue"),
            },
            {
              path: '/admin/form/detail/:id',
              name: 'AdminDetailForm',
              meta: { description: 'Detay' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/form/Detail.vue")
            }
          ]
        },
        {
          path: '/superuser',
          name: 'SuperUser',
          meta: { description: 'Süper Kullanıcı' },
          redirect: '/superuser/users',
          beforeEnter: (to, from, next) => {
            isAuth(to, from, next);
            isForbidden('SuperUser', to, from, next);
          },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/superuser/users',
              name: 'Users',
              meta: { description: 'Kullanıcılar' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/user/User.vue")
            }
          ]
        },
      ]
    },
    {
      path: "/403",
      name: "Forbidden",
      component: () => import("./views/pages/403.vue")
    },
    {
      path: "**",
      name: "NotFound",
      component: () => import("./views/pages/404.vue")
    },
    {
      path: "/500",
      name: "ServerError",
      component: () => import("./views/pages/500.vue")
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
