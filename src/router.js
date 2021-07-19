import Vue from "vue";
import Router from "vue-router";
import store from '@/core/services/store/store'

Vue.use(Router);

async function isAuth(to, from, next) {
  await store.dispatch('verifyAuth')
  if (!store.getters.isAuthenticated)
    next({ path: '/login', query: { returnPath: to.path } });
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
      path: '/login',
      query: { returnPath: '' },
      name: 'Login',
      component: () => import('./views/auth/Login.vue')
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
          meta: { lang: 'router.user.news.main' },
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
          meta: { lang: 'router.user.library.main' },
          redirect: '/library/book-shelves',
          beforeEnter: (to, from, next) => isAuth(to, from, next),
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/library/book-shelves',
              name: 'BookShelves',
              meta: { lang: 'router.user.library.my' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/libraries/List.vue")
            },
            {
              path: '/library/new-book',
              name: 'NewBook',
              meta: { lang: 'router.user.library.new' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/libraries/Create.vue")
            },
            {
              path: '/library/content/:id',
              name: 'LibraryContent',
              meta: { lang: 'router.user.library.detail' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/libraries/Content.vue")
            },
            {
              path: '/library/edit/:id',
              name: 'LibraryEdit',
              meta: { lang: 'router.user.library.edit' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/libraries/Edit.vue")
            },
          ]
        },
        {
          path: '/drafts',
          name: 'Draft',
          meta: { lang: 'router.user.draft' },
          component: () => import(`./views/drafts/List.vue`)
        },
        {
          path: '/useroptions',
          name: 'UserOption',
          meta: { lang: 'router.user.userOption' },
          component: () => import(`./views/profile/ProfileOption.vue`)
        },
        {
          path: '/admin/chapter',
          name: 'AdminChapter',
          meta: { lang: 'router.admin.chapter.main' },
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
              meta: { lang: 'router.admin.chapter.new' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/chapters/Create.vue")
            },
            {
              path: '/admin/chapters',
              name: 'AdminChapters',
              meta: { lang: 'router.admin.chapter.total' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/chapters/List.vue")
            },
            {
              path: '/admin/chapter/edit/:id',
              name: 'AdminEditChapter',
              meta: { lang: 'router.admin.chapter.edit' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/chapters/Edit.vue"),
            }
          ]
        },
        {
          path: '/admin/news',
          name: 'AdminNews',
          meta: { lang: 'router.admin.news.main' },
          redirect: '/admin/my-news',
          beforeEnter: (to, from, next) => isAuth(to, from, next),
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '/admin/new-news',
              name: 'AdminNewNews',
              meta: { lang: 'router.admin.news.new' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/news/Create.vue")
            },
            {
              path: '/admin/news',
              name: 'AdminTheNews',
              meta: { lang: 'router.admin.news.total' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/news/List.vue")
            },
            {
              path: '/admin/news/edit/:id',
              name: 'AdminEditNews',
              meta: { lang: 'router.admin.chapter.edit' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/news/Edit.vue"),
            }
          ]
        },
        {
          path: '/admin/forum',
          name: 'AdminForum',
          meta: { lang: 'router.admin.forum.main' },
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
              meta: { lang: 'router.admin.forum.new' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/forums/Create.vue")
            },
            {
              path: '/admin/forums',
              name: 'AdminForms',
              meta: { lang: 'router.admin.forum.total' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/forums/List.vue")
            },
            {
              path: '/admin/forum/edit/:id',
              name: 'AdminEditForum',
              meta: { lang: 'router.admin.forum.edit' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/forums/Edit.vue"),
            },
            {
              path: '/admin/forum/detail/:id',
              name: 'AdminDetailForum',
              meta: { lang: 'router.admin.forum.detail' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/forums/Detail.vue")
            }
          ]
        },
        {
          path: '/superuser',
          name: 'SuperUser',
          meta: { lang: 'router.superUser.main' },
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
              meta: { lang: 'router.superUser.users.main' },
              redirect: { name: "UsersList" },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: "/superuser/users/list",
                  name: "UsersList",
                  meta: { lang: 'router.superUser.users.list' },
                  component: () => import("@/views/superuser/users/List.vue")
                },
                {
                  path: "/superuser/users/create",
                  name: "UserCreate",
                  meta: { lang: 'router.superUser.users.new' },
                  component: () => import("@/views/superuser/users/Create")
                },
                {
                  path: "/superuser/users/edit/:id",
                  name: "UserEdit",
                  meta: { lang: 'router.superUser.users.edit' },
                  component: () => import("./views/superuser/users/Edit")
                },
              ],
            },
            {
              path: '/superuser/about',
              name: 'About',
              meta: { lang: 'router.superUser.about.main' },
              redirect: { name: "AboutList" },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: "/superuser/about/list",
                  name: "AboutList",
                  meta: { lang: 'router.superUser.about.list' },
                  component: () => import("@/views/superuser/about/List.vue")
                },
                {
                  path: "/superuser/about/create",
                  name: "AboutCreate",
                  meta: { lang: 'router.superUser.about.new' },
                  component: () => import("@/views/superuser/about/Create")
                },
                {
                  path: "/superuser/about/edit/:id",
                  name: "AboutEdit",
                  meta: { lang: 'router.superUser.about.edit' },
                  component: () => import("./views/superuser/about/Edit")
                },
              ],
            },
            {
              path: '/superuser/release',
              name: 'Release',
              meta: { lang: 'router.superUser.release.main' },
              redirect: { name: "ReleaseList" },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: {
                render(c) { return c('router-view') }
              },
              children: [
                {
                  path: "/superuser/release/list",
                  name: "ReleaseList",
                  meta: { lang: 'router.superUser.release.list' },
                  component: () => import("@/views/superuser/release/List.vue")
                },
                {
                  path: "/superuser/release/create",
                  name: "ReleaseCreate",
                  meta: { lang: 'router.superUser.release.new' },
                  component: () => import("@/views/superuser/release/Create")
                },
                {
                  path: "/superuser/release/edit/:id",
                  name: "ReleaseEdit",
                  meta: { lang: 'router.superUser.release.edit' },
                  component: () => import("./views/superuser/release/Edit")
                },
              ],
            },
            {
              path: '/superuser/category/chapter-categories',
              name: 'SuperUserChapterCategories',
              meta: { lang: 'router.superUser.category.chapter' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/chapters/Category.vue")
            },
            {
              path: '/superuser/category/news-categories',
              name: 'SuperUserNewsCategories',
              meta: { lang: 'router.superUser.category.news' },
              beforeEnter: (to, from, next) => isAuth(to, from, next),
              component: () => import("./views/admin/news/Category.vue")
            },
            {
              path: '/superuser/category/forum-categories',
              name: 'SuperUserForumCategories',
              meta: { lang: 'router.superUser.category.forum' },
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
