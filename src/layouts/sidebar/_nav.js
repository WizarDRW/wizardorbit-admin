export default [
    {
        _name: "Kullanıcı Menüsü",
        _id: 10022,
        children: [
            {
                _name: "Panel",
                to: "/dashboard",
                icon: "mdi-view-dashboard-variant"
            },
            {
                _name: "Blog",
                to: "/blog",
                icon: "mdi-post"
            },
            {
                _name: "Haber",
                to: "/news",
                icon: "mdi-newspaper"
            },
            {
                _name: "Forum",
                to: "/form",
                icon: "mdi-head-question-outline"
            }
        ]
    },
    {
        _name: "Yönetici Menüsü",
        _id: 10023,
        children: [
            {
                _name: "Blog",
                to: "/admin/blog",
                icon: "mdi-text-box-check"
            },
            {
                _name: "Haber",
                to: "/admin/news",
                icon: "mdi-text-box-check-outline"
            },
            {
                _name: "Forum",
                to: "/admin/form",
                icon: "mdi-tooltip-check"
            }
        ]
    },
    {
        _name: "Süper Kullanıcı",
        _id: 10024,
        children: [
            {
                _name: "Kullanıcılar",
                to: "/users",
                icon: "mdi-account-group"
            }
        ]
    }
]