export default [
    {
        _name: "Kullanıcı Menüsü",
        _roles: ["Client", "Admin", "SuperUser"],
        children: [
            {
                _name: "Panel",
                to: "/dashboard",
                icon: "mdi-view-dashboard-variant"
            },
            {
                _name: "Bölümler",
                to: "/chapter",
                icon: "mdi-post"
            },
            {
                _name: "Haber",
                to: "/news",
                icon: "mdi-newspaper"
            },
            {
                _name: "Forum",
                to: "/forum",
                icon: "mdi-head-question-outline"
            },
            {
                _name: "Kütüphanem",
                to: "/library",
                icon: "mdi-bookmark-multiple-outline"
            }
        ]
    },
    {
        _name: "Yönetici Menüsü",
        _roles: ["Admin", "SuperUser"],
        children: [
            {
                _name: "Bölümler",
                to: "/admin/chapter",
                icon: "mdi-text-box-check"
            },
            {
                _name: "Haber",
                to: "/admin/news",
                icon: "mdi-text-box-check-outline"
            },
            {
                _name: "Forum",
                to: "/admin/forum",
                icon: "mdi-tooltip-check"
            }
        ]
    },
    {
        _name: "Süper Kullanıcı",
        _roles: ["SuperUser"],
        children: [
            {
                _name: "Kullanıcılar",
                to: "/superuser/users",
                icon: "mdi-account-group"
            },
            {
                _name: "Bölüm Seçenekleri",
                to: "/superuser/category/chapter-categories",
                icon: "mdi-select-group"
            },
            {
                _name: "Haber Seçenekleri",
                to: "/superuser/category/news-categories",
                icon: "mdi-select-group"
            },
            {
                _name: "Forum Seçenekleri",
                to: "/superuser/category/forum-categories",
                icon: "mdi-select-group"
            }
        ]
    }
]