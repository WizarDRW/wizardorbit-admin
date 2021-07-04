import Vue from "vue";
import Router from "vue-router";
import store from '@/core/services/store/store'

Vue.use(Router);

async function isAuth(to, from, next) {
  next();
}

async function isForbidden(role, to, from, next) {
  var currentUser = store.getters.currentUser;
  if (currentUser.role == role || currentUser.role == 'SuperUser') {
    next();
  } else next({ name: "Forbidden" })
}
export default new Router({
  mode: "history",
  linkExactActiveClass: "active",
  routes: [
    {
      path: '/authenticate/google',
      name: 'googleauth',
      beforeEnter: async (to, from, next) => {
        store.dispatch('googleAuth', to.query)
        isAuth(to, from, next)
      }
    },
    {
      path: '/auth/:token',
      name: 'auth',
      beforeEnter: async (to, from, next) => {
        if (to.params.token) {
          localStorage.clear();
          localStorage.setItem("id_token", to.params.token);
          await store.dispatch('verifyAuth');
          if (store.getters['isAuthenticated']) {
            next({ name: "Home" })
          } else next({ name: "Login" })
        }
      },
    },
    {
      path: '/',
      name: 'Home',
      meta: { lang: 'router.home' },
      redirect: '/dashboard',
      beforeEnter: isAuth,
      component: () => import("./layouts/Container.vue"),
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          beforeEnter: (to, from, next) => isAuth(to, from, next),
          component: () => import('./views/dashboard/Index.vue')
        },
        {
          path: '/chapter',
          name: 'Chapter',
          meta: { lang: 'router.user.chapter.main' },
          redirect: '/my-chapters',
          beforeEnter: (to, from, next) => isAuth(to, from, next),
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/new-chapter/:draftid?',
              name: 'NewChapter',
              meta: { lang: 'router.user.chapter.new' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/client/chapters/Create.vue")
            },
            {
              path: '/my-chapters',
              name: 'MyChapters',
              meta: { lang: 'router.user.chapter.my' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/client/chapters/List.vue")
            },
            {
              path: '/chapter/edit/:id',
              name: 'EditChapter',
              meta: { lang: 'router.user.chapter.edit' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/client/chapters/Edit.vue"),
            }
          ]
        },
        {
          path: '/news',
          name: 'News',
          meta: { lang: 'router.news.main' },
          redirect: '/my-news',
          beforeEnter: (to, from, next) => isAuth(to, from, next),
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/new-news/:draftid?',
              name: 'NewNews',
              meta: { lang: 'router.user.news.new' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/client/news/Create.vue")
            },
            {
              path: '/my-news',
              name: 'MyNews',
              meta: { lang: 'router.user.news.my' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/client/news/List.vue")
            },
            {
              path: '/news/edit/:id',
              name: 'EditNews',
              meta: { lang: 'router.user.news.edit' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/client/news/Edit.vue"),
            }
          ]
        },
        {
          path: '/forum',
          name: 'Forum',
          meta: { lang: 'router.user.forum.main' },
          redirect: '/my-forums',
          beforeEnter: (to, from, next) => isAuth(to, from, next),
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/new-forum/:draftid?',
              name: 'NewForum',
              meta: { lang: 'router.user.forum.new' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/client/forums/Create.vue")
            },
            {
              path: '/my-forums',
              name: 'MyForums',
              meta: { lang: 'router.user.forum.my' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/client/forums/List.vue")
            },
            {
              path: '/forum/edit/:id',
              name: 'EditForum',
              meta: { lang: 'router.user.forum.edit' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/client/forums/Edit.vue"),
            },
            {
              path: '/forum/detail/:id',
              name: 'DetailForum',
              meta: { lang: 'router.user.forum.detail' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/client/forums/Detail.vue")
            }
          ]
        },
        {
          path: '/library',
          name: 'Library',
          meta: { description: 'Kütüphane' },
          redirect: '/library/book-shelves',
          beforeEnter: (to, from, next) => isAuth(to, from, next),
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/library/book-shelves',
              name: 'BookShelves',
              meta: { description: 'Raftaki Kitaplar' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/libraries/List.vue")
            },
            {
              path: '/library/new-book',
              name: 'NewBook',
              meta: { description: 'Yeni Kitap' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/libraries/Create.vue")
            },
            {
              path: '/library/content/:id',
              name: 'LibraryContent',
              meta: { description: 'Kitap' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/libraries/Content.vue")
            },
            {
              path: '/library/edit/:id',
              name: 'LibraryEdit',
              meta: { description: 'Kitap Düzenle' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/libraries/Edit.vue")
            },
          ]
        },
        {
          path: '/drafts',
          name: 'Draft',
          meta: { description: 'Teslaklar' },
          component: () => import(`./views/drafts/List.vue`)
        },
        {
          path: '/useroptions',
          name: 'UserOption',
          meta: { description: 'Kullanıcı Seçenekleri' },
          component: () => import(`./views/profile/ProfileOption.vue`)
        },
        {
          path: '/admin/chapter',
          name: 'AdminChapter',
          meta: { description: 'Bölüm(Yönetici)' },
          redirect: '/admin/chapters',
          beforeEnter: async (to, from, next) => {
            await isAuth(to, from, next);
            await isForbidden('Admin', to, from, next);
          },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/admin/new-chapter',
              name: 'AdminNewChapter',
              meta: { description: 'Yeni Bölüm' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/chapters/Create.vue")
            },
            {
              path: '/admin/chapters',
              name: 'AdminChapters',
              meta: { description: 'Bölümler' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/chapters/List.vue")
            },
            {
              path: '/admin/chapter/edit/:id',
              name: 'AdminEditChapter',
              meta: { description: 'Düzenle' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/chapters/Edit.vue"),
            },
            {
              path: '/admin/chapter/detail/:id',
              name: 'AdminDetailChapter',
              meta: { description: 'Detay' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/chapters/Detail.vue")
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
              name: 'AdminNewNews',
              meta: { description: 'Yeni' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/news/Create.vue")
            },
            {
              path: '/admin/my-news',
              name: 'AdminTheNews',
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
          path: '/admin/forum',
          name: 'AdminForum',
          meta: { description: 'Yönetici Forumu' },
          redirect: '/admin/forums',
          beforeEnter: (to, from, next) => {
            isAuth(to, from, next);
            isForbidden('Admin', to, from, next);
          },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/admin/new-forum',
              name: 'AdminNewForm',
              meta: { description: 'Yeni Forum' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/forums/Create.vue")
            },
            {
              path: '/admin/forums',
              name: 'AdminForms',
              meta: { description: 'Forumlar' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/forums/List.vue")
            },
            {
              path: '/admin/forum/edit/:id',
              name: 'AdminEditForum',
              meta: { description: 'Düzenle' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/forums/Edit.vue"),
            },
            {
              path: '/admin/forum/detail/:id',
              name: 'AdminDetailForum',
              meta: { description: 'Detay' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/forums/Detail.vue")
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
              redirect: { name: "UsersList" },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: "/superuser/users/list",
                  name: "UsersList",
                  meta: { description: 'Kullanıcılar Listesi' },
                  component: () => import("@/views/superuser/users/List.vue")
                },
                {
                  path: "/superuser/users/create",
                  name: "UserCreate",
                  meta: { description: 'Kullanıcı Oluştur' },
                  component: () => import("@/views/superuser/users/Create")
                },
                {
                  path: "/superuser/users/edit/:id",
                  name: "UserEdit",
                  meta: { description: 'Kullanıcı Düzenle' },
                  component: () => import("./views/superuser/users/Edit")
                },
              ],
            },
            {
              path: '/superuser/about',
              name: 'About',
              meta: { description: 'Hakkında' },
              redirect: { name: "AboutList" },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: "/superuser/about/list",
                  name: "AboutList",
                  meta: { description: 'Hakkında Listesi' },
                  component: () => import("@/views/superuser/about/List.vue")
                },
                {
                  path: "/superuser/about/create",
                  name: "AboutCreate",
                  meta: { description: 'Hakkında Oluştur' },
                  component: () => import("@/views/superuser/about/Create")
                },
                {
                  path: "/superuser/about/edit/:id",
                  name: "AboutEdit",
                  meta: { description: 'Hakkında Düzenle' },
                  component: () => import("./views/superuser/about/Edit")
                },
              ],
            },
            {
              path: '/superuser/release',
              name: 'Release',
              meta: { description: 'Sürüm Notu' },
              redirect: { name: "ReleaseList" },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: "/superuser/release/list",
                  name: "ReleaseList",
                  meta: { description: 'Sürüm Notu Listesi' },
                  component: () => import("@/views/superuser/release/List.vue")
                },
                {
                  path: "/superuser/release/create",
                  name: "ReleaseCreate",
                  meta: { description: 'Sürüm Notu Oluştur' },
                  component: () => import("@/views/superuser/release/Create")
                },
                {
                  path: "/superuser/release/edit/:id",
                  name: "ReleaseEdit",
                  meta: { description: 'Sürüm Notu Düzenle' },
                  component: () => import("./views/superuser/release/Edit")
                },
              ],
            },
            {
              path: '/superuser/category/chapter-categories',
              name: 'SuperUserChapterCategories',
              meta: { description: 'Bölüm Kategorileri' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/chapters/Category.vue")
            },
            {
              path: '/superuser/category/news-categories',
              name: 'SuperUserNewsCategories',
              meta: { description: 'Haber Kategorileri' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/news/Category.vue")
            },
            {
              path: '/superuser/category/forum-categories',
              name: 'SuperUserForumCategories',
              meta: { description: 'Forum Kategorileri' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/forums/Category.vue")
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
