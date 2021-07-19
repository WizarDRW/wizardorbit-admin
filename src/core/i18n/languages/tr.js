const tr = {
    inputErrorMessage: {
        max: 'Girdi en çok {max} uzunluğunda olmalıdır!',
        min: 'Girdi en az {min} uzunluğunda olmalıdır!',
        required: 'Gereklidir!',
    },
    keywords: {
        admin: 'Yetkili',
        back: 'Geri',
        biography: 'Biyografi',
        block: 'Blokla',
        cancel: 'İptal',
        category: 'Kategori',
        class: 'Sınıf',
        chapter: 'Bölüm',
        chapters: 'Bölümler',
        client: 'Kullanıcı',
        close: 'Kapat',
        comment: 'Yorum',
        comments: 'Yorumlar',
        confirm_password: 'Şifreyi Onayla',
        content: 'İçerik',
        data: 'Veri',
        date: 'Tarih',
        degree: 'Derece',
        delete: 'Sil',
        description: 'Açıklama',
        edit: 'Düzenle',
        email: 'E-posta',
        error: 'Hata',
        first_name: 'Adı',
        flow: 'Akış',
        forum: 'Forum',
        forums: 'Forumlar',
        gantt: 'Gantt',
        icon: 'Sembol',
        identity: 'Kimlik',
        integral: 'İntegral',
        key: 'Anahtar',
        last_name: 'Soyadı',
        logarithm: 'Logaritma',
        login: 'Giriş',
        logout: 'Çıkış',
        m_h1: 'Başlık 1',
        m_h2: 'Başlık 2',
        m_h3: 'Başlık 3',
        messages: 'Mesajlar',
        news: 'Haber',
        offline: 'Çevrimdışı',
        online: 'Çevrimiçi',
        options: 'Seçenekler',
        password: 'Şifre',
        pie: 'Pasta',
        pow: 'Üst',
        preview: 'Önizle',
        private: 'Özel',
        process: 'İşlem',
        profile: 'Profil',
        public: 'Herkes',
        publish: 'Yayına Al',
        reset: 'Sıfırla',
        role: 'Rolü',
        save: 'Kaydet',
        sequence: 'Sıra',
        showcase: 'Vitrin',
        solution: 'Çözüm',
        state: 'Durum',
        status: 'Durum',
        success: 'Başarılı',
        super_user: 'Yüksek Yetkili',
        sqrt: 'Karekök',
        tag: 'Etiket',
        tasks: 'Görevler',
        timeline: 'Zaman Çizergesi',
        title: 'Başlık',
        the_news: 'Haberler',
        theme: 'Tema',
        type: 'Tür',
        unblock: 'Bloke Kaldır',
        username: 'Kullanıcı Adı',
        version: 'Sürüm',
        views: 'Görünümler',
        warning: 'Dikkat',
        width: 'Genişlik',
        write: 'Yaz',
    },
    messages: {
        add_content: '"{name}" başlıklı içerik ekleniyor.',
        add_content_success: '"{name}" başlıklı içerik başarı ile eklenmiştir.',
        delete_content: '{id} ID numaralı içerik siliniyor.',
        delete_content_success: '{id} ID numaralı içerik başarı ile silinmiştir.',
        delete_message: `Silme işlemini onaylarsanız geriye dönüşü olmana bir işlem yapmış
        olacaksınız. Yazdığınız yazınız veritabanımızdan anlık
        silinmektedir.`,
        update_content: '{id} ID numaralı içerik güncelleniyor.',
        update_content_success: '{id} ID numaralı içerik başarı ile güncellenmiştir.',
        reset_password_monthly: 'Şifrenizi aylık olarak sıfırlamanızı öneririz.',
        theme_select: "Karanlık mod ve aydınlık moddan sadece 1'er adet seçebilirsiniz."
    },
    phrases: {
        addImage: 'Resim Ekle',
        blocked: 'Engellendi',
        card_subtitle: 'Kart Destek Başlığı',
        card_text: 'Kart Metni',
        card_title: 'Kart Başlığı',
        content_markdown: 'İçerik(Markdown)',
        create_date: 'Oluşturma Tarihi',
        create_user: 'Oluşturan Kullanıcı',
        deleteImage: "Resmi Sil",
        loading: 'Yükleniyor',
        admin_panel_login: 'Yönetici Paneli Girişi',
        moderatorApproval: 'Moderatör Onayında',
        noDataAvailable: 'Veri yok',
        published: 'Yayında',
        resetPassword: 'Şifre Sıfırla',
        reverse_full_name: 'Tam adı ters yaz',
        user_image: 'Kullanıcı Resmi',
        user_journey: 'Kullanıcı Yolculuğu',
        user_view_settings: 'Kullanıcı görünümü ayarlar.',
        version_number: 'Sürüm Numarası(v0.1.0)',
    },
    router: {
        home: "Ev",
        user: {
            chapter: {
                main: "Bölüm",
                my: "Bölümlerim",
                new: "Yeni Bölüm Oluştur",
                edit: "({edit}) Bölümünü Düzenle",
                delete: "({0}) Bölümünü Sil"
            },
            news: {
                main: "Haber",
                my: "Haberlerim",
                new: "Yeni Haber Oluştur",
                edit: "({edit}) Haberini Düzenle",
                delete: "({0}) Haberini Sil"
            },
            forum: {
                main: "Forum",
                my: "Forumlarım",
                new: "Yeni Forum Oluştur",
                edit: "({edit}) Forumunu Düzenle",
                delete: "({0}) Forumunu Sil",
                detail: "({edit}) Detayları"
            },
            library: {
                main: "Kütüphane",
                my: "Kitaplarım",
                new: "Yeni kitap oluştur",
                edit: "({edit}) Kitabını düzenle",
                delete: "({0}) Kitabı sil"
            },
            draft: "Taslaklar",
            userOption: "Kullanıcı seçenekleri",
        },
        admin: {
            chapter: {
                main: "Bölüm",
                total: "Bölüm",
                new: "Yeni Bölüm Oluştur",
                edit: "({edit}) Bölüm Düzenle",
                delete: "({0}) Bölüm Sil"
            },
            news: {
                main: "Haberler",
                total: "Haberler",
                new: "Yeni Haberler Yarat",
                edit: "({edit}) Haberleri düzenle",
                delete: "({0}) Haberleri sil"
            },
            forum: {
                main: "Forum",
                total: "Forumlar",
                new: "Yeni Forum Oluştur",
                edit: "({edit}) Forumunuzu Düzenleyin",
                delete: "({0}) Forumu Sil"
            },
        },
        superUser: {
            main: 'Süper Kullanıcı',
            users: {
                main: 'Kullanıcılar',
                list: 'Kullanıcıların Listesi',
                new: 'Kullanıcı Oluştur',
                edit: 'Kullanıcı Düzenle'
            },
            about: {
                main: 'Hakkında',
                list: 'Hakkında Listesi',
                new: "Hakkında Oluştur",
                edit: "Hakkında Düzenle"
            },
            release: {
                main: 'Sürüm Notu',
                list: 'Sürüm Notları',
                new: "Sürüm Oluştur",
                edit: "Sürüm Düzenle"
            },
            category: {
                chapter: 'Bölüm Kategorileri',
                news: 'Haber Kategorileri',
                forum: 'Forum Kategorileri',
            }
        }
    },
    sideMenus: {
        about: 'Hakkında',
        adminMenus: 'Admin Menüleri',
        chapter: 'Bölüm',
        chapterOptions: 'Bölüm Seçenekleri',
        chapters: 'Bölümler',
        dashboard: 'Gösterge Paneli',
        drafts: 'Taslaklar',
        forumOptions: 'Forum Seçenekleri',
        forums: 'Forumlar',
        libraries: 'Kütüphaneler',
        news: 'Haberler',
        newsOptions: 'Haber Seçenekleri',
        release: 'Sürüm Notları',
        superUserMenus: 'Süper Kullanıcı Menüleri',
        userMenus: 'Kullanıcı Menüleri',
        users: 'Kullanıcılar',
    },
    speedDial: {
        cardSubTitle: 'Kart Alt Başlığı',
        cardText: 'Metin Alanı',
        cardTitle: 'Kart Başlığı',
        code: 'Kod Bloğu',
        image: 'Resim',
        markdown: 'Markdown',
        textEditor: 'Metin Editörü',
    },
    title: 'Panel | Sihirbazın Yörüngesi',
    // Contents 👇👇👇👇👇👇👇👇👇👇👇👇
    chapter: {
        new: 'Yeni Bölüm'
    },
    news: {
        new: 'Yeni Haber'
    },
    forum: {
        new: 'Yeni Forum'
    },
    library: {
        new: 'Yeni Kitap'
    },
    user: {
        new: 'Yeni Kullanıcı'
    },
    release: {
        new: 'Yeni Sürüm Notu'
    },
    about: {
        new: 'Yeni Hakkında Notu'
    }
}

export default { tr }