import colors from 'vuetify/lib/util/colors'

const sunset = {
    c1: "#f67280",
    c2: "#c06c84",
    c3: "#6c5b7b",
    c4: "#355c7d"
}

export default {
    background: sunset.c2,
    secondary: colors.indigo,
    tertiary: colors.pink.base,
    tiptaptoolbar: '#fff',

    // header
    header: {
        base: sunset.c4,
        lighten5: '#fff'
    },
    header_theme_btn: "#fff",
    header_login_btn: "#fff",

    //form -> showcase -> top
    form_showcase_top_table_hover_background: "#F5F5F5",

    // v-card colors
    v_card_background: sunset.c3,
    v_card_title_color: colors.orange.lighten5,

    // v-tabs colors
    v_tabs_header_background: sunset.c1,
    v_tabs_header_color: "#FFF",
    v_tabs_title_slider_color: sunset.c4,
    v_tabs_iactive_color: "#FFF",
}