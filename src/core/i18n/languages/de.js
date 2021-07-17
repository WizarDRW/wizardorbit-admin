const de = {
    title: "Panel | Umlaufbahn des Zauberers",
    keywords: {
        tasks: 'Aufgaben',
        messages: 'Mitteilungen',
        options: 'Optionen',
        logout: 'Ausloggen',
        width: 'Breite',
        back: 'Zurück',
        preview: 'Vorschau',
        save: 'Speichern',
        edit: 'Bearbeiten',
        delete: 'Kräfte',
        category: 'Kategorie',
        write: 'Sommer',
        tag: 'Etikette',
        key: 'Schlüssel',
        description: 'Beschreibung',
        title: 'Titel',
        showcase: 'Vitrine',
        cancel: 'Stornieren',
        warning: 'Beachtung',
        error: 'Error',
        success: 'Erfolgreich',
        content: 'Inhalt',
        status: 'Status',
        comment: 'Kommentar',
        comments: 'Bemerkungen',
        block: 'Den Block setzen!',
        unblock: 'Aufheben',
        publish: 'Veröffentlichen',
        process: 'Prozess',
        data: 'Daten',
        date: 'Datum',
        class: 'Klasse',
        flow: 'Fließen',
        sequence: 'Reihenfolge',
        gantt: 'Gantt',
        state: 'Zustand',
        pie: 'Kuchen',
        integral: 'Integral',
        pow: 'Pow',
        sqrt: 'Sqrt',
        logarithm: 'Logarithmus',
        m_h1: 'Titel 1',
        m_h2: 'Titel 2',
        m_h3: 'Titel 3',
        solution: 'Lösung',
        chapter: 'Kapitel',
        news: 'Nachrichten',
        forum: 'Forum',
        type: 'Art'
    },
    phrases: {
        resetPassword: 'Passwort zurücksetzen',
        loading: 'Wird geladen',
        addImage: 'Bild hinzufügen',
        deleteImage: "Foto Löschen",
        noDataAvailable: 'Keine Daten verfügbar',
        create_user: 'Benutzer bilden',
        create_date: 'Erstellungsdatum',
        published: 'Veröffentlicht',
        moderatorApproval: 'Moderatorgenehmigung.',
        blocked: 'verstopft',
        card_title: 'Kartentitel',
        card_subtitle: 'Kartenuntertitel',
        card_text: 'Kartentext',
        content_markdown: 'Inhalt(Markdown)',
        user_journey: 'Benutzerreise'
    },
    sideMenus: {
        userMenus: 'Benutzermenüs',
        adminMenus: 'Admin-Menüs',
        superUserMenus: 'Superbenutzermenüs',
        dashboard: 'Instrumententafel',
        chapters: 'Kapitel',
        chapter: 'Kapitel',
        news: 'Nachrichten',
        forums: 'Foren',
        libraries: 'Bibliotheken',
        drafts: 'Entwürfe',
        users: 'Benutzer',
        chapterOptions: 'Kapitel Optionen',
        newsOptions: 'Nachrichtenoptionen',
        forumOptions: 'Forum-Optionen',
        release: 'Versionshinweise',
        about: 'Über'
    },
    message: {
        delete_message: `Wenn Sie den Löschvorgang bestätigen, haben Sie eine Transaktion durchgeführt, um umgekehrt zu sein
        Sie werden sein. Ihr Beitrag ist Ihre Datenbank aus unserer Datenbank
        wird gelöscht.`,
        add_content: 'Inhalt mit der ID-Nummer {id} wird hinzugefügt.',
        add_content_success: '"Inhalt Titel "{name}" wurde erfolgreich hinzugefügt',
        update_content: 'Inhalt mit ID {ID} aktualisieren.',
        update_content_success: 'Der Inhalt mit ID {ID} wurde erfolgreich aktualisiert.',
        delete_content: 'Inhalt mit ID {ID} wird gelöscht.',
        delete_content_success: 'Inhalt mit ID {ID} wurde erfolgreich gelöscht.',
    },
    router: {
        home: "Zuhause",
        user: {
            chapter: {
                main: "Kapitel",
                my: "Meine Abschnitte",
                new: "Neue Partition erstellen.",
                edit: "({edit}) Abschnitt bearbeiten",
                delete: "({0}) Partition löschen"
            },
            news: {
                main: "Nachrichten",
                my: "Meine Neuigkeiten",
                new: "Neue news erstellen.",
                edit: "({edit}) Bearbeiten Sie die Nachrichten.",
                delete: "({0}) Löschen Sie die Nachrichten"
            },
            forum: {
                main: "Forum",
                my: "Meine Foren",
                new: "Neues Forum erstellen.",
                edit: "({edit}) Bearbeiten Sie Ihr Forum",
                delete: "({0}) Das Forum löschen",
                detail: "({edit}) Einzelheiten"
            },
            library: {
                main: "Bibliothek",
                my: "Meine Bücher",
                new: "Neues Buch erstellen.",
                edit: "({edit}) Bearbeiten Sie Ihr Buch",
                delete: "({0}) Das Buch löschen"
            },
            draft: "Entwurf",
            userOption: "Benutzeroptionen",
        },
        admin: {
            chapter: {
                main: "Kapitel",
                total: "Kapitel",
                new: "Neues Kapitel erstellen",
                edit: "({edit}) Kapitel bearbeiten",
                delete: "({0}) Kapitel löschen"
            },
            news: {
                main: "Nachrichten",
                total: "Nachrichten",
                new: "Neue news erstellen.",
                edit: "({edit}) Bearbeiten Sie die Nachrichten.",
                delete: "({0}) Löschen Sie die Nachrichten"
            },
            forum: {
                main: "forum",
                total: "Foren",
                new: "Neues Forum erstellen.",
                edit: "({edit}) Bearbeiten Sie Ihr Forum",
                delete: "({0}) Das Forum löschen"
            },
        },
        superUser: {
            main: 'Super-Benutzer',
            users: {
                main: 'Benutzer',
                list: 'Benutzerliste',
                new: "Erstellen Sie den Benutzer",
                edit: "Bearbeiten Sie den Benutzer"
            },
            about: {
                main: 'Über',
                list: 'Über die Liste.',
                new: "Erstellen",
                edit: "Bearbeiten"
            },
            release: {
                main: 'Veröffentlichung',
                list: 'Releaseliste',
                new: "Freigabe erstellen.",
                edit: "Veröffentlichung bearbeiten."
            },
            category: {
                chapter: 'Kapitel Kategorien',
                news: 'Nachrichtenkategorien',
                forum: 'Forumkategorien',
            }
        }
    },
    speedDial: {
        cardTitle: 'Kartentitel',
        cardSubTitle: 'Kartenuntertitel',
        cardText: 'Textbereich.',
        markdown: 'Markdown.',
        code: 'Codeblock',
        textEditor: 'Texteditor',
        image: 'Bild'
    },
    chapter: {
        new: 'Neues Kapitel'
    },
    news: {
        new: 'Neue News'
    },
    forum: {
        new: 'Neues Forum'
    }
}

export default { de }