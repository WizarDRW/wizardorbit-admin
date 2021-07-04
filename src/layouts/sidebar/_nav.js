export default [
    {
        _name: 'message.sideMenus.userMenus',
        _roles: ["Client", "Admin", "SuperUser"],
        children: [
            {
                _name: 'message.sideMenus.dashboard',
                to: "/dashboard",
                icon: "mdi-view-dashboard-variant"
            },
            {
                _name: 'message.sideMenus.chapters',
                to: "/chapter",
                icon: "mdi-post"
            },
            {
                _name: 'message.sideMenus.news',
                to: "/news",
                icon: "mdi-newspaper"
            },
            {
                _name: 'message.sideMenus.forums',
                to: "/forum",
                icon: "mdi-head-question-outline"
            },
            {
                _name: 'message.sideMenus.libraries',
                to: "/library",
                icon: "mdi-bookmark-multiple-outline"
            },
            {
                _name: 'message.sideMenus.drafts',
                to: "/drafts",
                icon: "mdi-file"
            }
        ]
    },
    {
        _name: 'message.sideMenus.adminMenus',
        _roles: ["Admin", "SuperUser"],
        children: [
            {
                _name: 'message.sideMenus.chapters',
                to: "/admin/chapter",
                icon: "mdi-text-box-check"
            },
            {
                _name: 'message.sideMenus.news',
                to: "/admin/news",
                icon: "mdi-text-box-check-outline"
            },
            {
                _name: 'message.sideMenus.forums',
                to: "/admin/forum",
                icon: "mdi-tooltip-check"
            }
        ]
    },
    {
        _name: 'message.sideMenus.superUserMenus',
        _roles: ["SuperUser"],
        children: [
            {
                _name: 'message.sideMenus.users',
                to: "/superuser/users",
                icon: "mdi-account-group"
            },
            {
                _name: 'message.sideMenus.chapterOptions',
                to: "/superuser/category/chapter-categories",
                icon: "mdi-select-group"
            },
            {
                _name: 'message.sideMenus.newsOptions',
                to: "/superuser/category/news-categories",
                icon: "mdi-select-group"
            },
            {
                _name: 'message.sideMenus.forumOptions',
                to: "/superuser/category/forum-categories",
                icon: "mdi-select-group"
            },
            {
                _name: 'message.sideMenus.release',
                to: "/superuser/release",
                icon: "mdi-alert-decagram"
            },
            {
                _name: 'message.sideMenus.about',
                to: "/superuser/about",
                icon: "mdi-information-outline"
            },
        ]
    }
]