const tr = {
    title: 'Panel | Sihirbazın Yörüngesi',
    keywords: {
        tasks: 'Görevler',
        messages: 'Mesajlar',
        options: 'Seçenekler',
        logout: 'Çıkış',
        width: 'Genişlik',
        back: 'Geri',
        preview: 'Önizle',
        save: 'Kaydet',
        edit: 'Düzenle',
        delete: 'Sil',
        category: 'Kategori',
        write: 'Yaz',
        tag: 'Etiket',
        key: 'Anahtar',
        description: 'Açıklama',
        title: 'Başlık',
        showcase: 'Vitrin',
        cancel: 'İptal',
        warning: 'Dikkat',
        error: 'Hata',
        success: 'Başarılı',
        content: 'İçerik',
        status: 'Durum',
        comment: 'Yorum',
        comments: 'Yorumlar',
        block: 'Blokla',
        unblock: 'Bloke Kaldır',
        publish: 'Yayına Al',
        process: 'İşlem',
        data: 'Veri',
        date: 'Tarih',
        class: 'Sınıf',
        flow: 'Akış',
        sequence: 'Sıra',
        gantt: 'Gantt',
        state: 'Durum',
        pie: 'Pasta',
        integral: 'İntegral',
        pow: 'Üst',
        sqrt: 'Karekök',
        logarithm: 'Logaritma',
        m_h1: 'Başlık 1',
        m_h2: 'Başlık 2',
        m_h3: 'Başlık 3',
    },
    phrases: {
        resetPassword: 'Şifre Sıfırla',
        loading: 'Yükleniyor',
        addImage: 'Resim Ekle',
        deleteImage: "Resmi Sil",
        noDataAvailable: 'Veri yok',
        create_user: 'Oluşturan Kullanıcı',
        create_date: 'Oluşturma Tarihi',
        published: 'Yayında',
        moderatorApproval: 'Moderatör Onayında',
        blocked: 'Engellendi',
        card_title: 'Kart Başlığı',
        card_subtitle: 'Kart Destek Başlığı',
        card_text: 'Kart Metni',
        content_markdown: 'İçerik(Markdown)',
        user_journey: 'Kullanıcı Yolculuğu'
    },
    sideMenus: {
        userMenus: 'Kullanıcı Menüleri',
        adminMenus: 'Admin Menüleri',
        superUserMenus: 'Süper Kullanıcı Menüleri',
        dashboard: 'Gösterge Paneli',
        chapters: 'Bölümler',
        chapter: 'Bölüm',
        news: 'Haberler',
        forums: 'Forumlar',
        libraries: 'Kütüphaneler',
        drafts: 'Taslaklar',
        users: 'Kullanıcılar',
        chapterOptions: 'Bölüm Seçenekleri',
        newsOptions: 'Haber Seçenekleri',
        forumOptions: 'Forum Seçenekleri',
        release: 'Sürüm Notları',
        about: 'Hakkında',
    },
    messages: {
        delete_message: `Silme işlemini onaylarsanız geriye dönüşü olmana bir işlem yapmış
        olacaksınız. Yazdığınız yazınız veritabanımızdan anlık
        silinmektedir.`,
        add_content: '"{name}" başlıklı içerik ekleniyor.',
        add_content_success: '"{name}" başlıklı içerik başarı ile eklenmiştir.',
        update_content: '{id} ID numaralı içerik güncelleniyor.',
        update_content_success: '{id} ID numaralı içerik başarı ile güncellenmiştir.',
        delete_content: '{id} ID numaralı içerik siliniyor.',
        delete_content_success: '{id} ID numaralı içerik başarı ile silinmiştir.',
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
    speedDial: {
        cardTitle: 'Kart Başlığı',
        cardSubTitle: 'Kart Alt Başlığı',
        cardText: 'Metin Alanı',
        markdown: 'Markdown',
        code: 'Kod Bloğu',
        textEditor: 'Metin Editörü',
        image: 'Resim'
    },
    chapter: {
        new: 'Yeni Bölüm'
    },
    news: {
        new: 'Yeni Haber'
    },
    forum: {
        new: 'Yeni Forum'
    }
}

export default { tr }