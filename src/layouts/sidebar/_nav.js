export default [
    {
        _name: 'sideMenus.userMenus',
        _roles: ["Client", "Admin", "SuperUser"],
        children: [
            {
                _name: 'sideMenus.dashboard',
                to: "/dashboard",
                icon: "mdi-view-dashboard-variant"
            },
            {
                _name: 'sideMenus.chapters',
                to: "/chapter",
                icon: "mdi-post"
            },
            {
                _name: 'sideMenus.news',
                to: "/news",
                icon: "mdi-newspaper"
            },
            {
                _name: 'sideMenus.forums',
                to: "/forum",
                icon: "mdi-head-question-outline"
            },
            {
                _name: 'sideMenus.libraries',
                to: "/library",
                icon: "mdi-bookmark-multiple-outline"
            },
            {
                _name: 'sideMenus.drafts',
                to: "/drafts",
                icon: "mdi-file"
            }
        ]
    },
    {
        _name: 'sideMenus.adminMenus',
        _roles: ["Admin", "SuperUser"],
        children: [
            {
                _name: 'sideMenus.chapters',
                to: "/admin/chapter",
                icon: "mdi-text-box-check"
            },
            {
                _name: 'sideMenus.news',
                to: "/admin/news",
                icon: "mdi-text-box-check-outline"
            },
            {
                _name: 'sideMenus.forums',
                to: "/admin/forum",
                icon: "mdi-tooltip-check"
            }
        ]
    },
    {
        _name: 'sideMenus.superUserMenus',
        _roles: ["SuperUser"],
        children: [
            {
                _name: 'sideMenus.users',
                to: "/superuser/users",
                icon: "mdi-account-group"
            },
            {
                _name: 'sideMenus.chapterOptions',
                to: "/superuser/category/chapter-categories",
                icon: "mdi-select-group"
            },
            {
                _name: 'sideMenus.newsOptions',
                to: "/superuser/category/news-categories",
                icon: "mdi-select-group"
            },
            {
                _name: 'sideMenus.forumOptions',
                to: "/superuser/category/forum-categories",
                icon: "mdi-select-group"
            },
            {
                _name: 'sideMenus.release',
                to: "/superuser/release",
                icon: "mdi-alert-decagram"
            },
            {
                _name: 'sideMenus.about',
                to: "/superuser/about",
                icon: "mdi-information-outline"
            },
        ]
    }
]