<template>
  <div>
    <h2>Markdown</h2>
    <v-data-table
      :headers="headers"
      :items="markdowns"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
    <h2>Matematik</h2>
    <v-data-table
      :headers="headers"
      :items="maths"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
    <h2>Diagram</h2>
    <v-data-table
      :headers="headers"
      :items="diagrams"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Func",
          align: "start",
          sortable: false,
          value: "func",
        },
        { text: "Açıklama", value: "description" },
      ],
      markdowns: [
        {
          func: "#",
          description: "En büyük başlığı ekler. bkz; h1",
        },
        {
          func: "##",
          description: "2. büyük başlığı ekler. bkz; h2",
        },
        {
          func: "###",
          description: "3. büyük başlığı ekler. bkz; h3",
        },
        {
          func: "**",
          description:
            "Kalın yazar. bkz; <b>Content</b> veya <strong>Content</strong> Kullanım; **Content**",
        },
        {
          func: "*",
          description: "İtalik yazar. bkz; <i>Content</i> Kullanım; *Content*",
        },
        {
          func: "**_",
          description:
            "Kalın ve İtalik yazar. bkz; <b><i>Content</i></b> Kullanım; **_Content_**",
        },
        {
          func: "-",
          description:
            "1. Maddeyi temsil eder. bkz; <ul><li> Kullanım; - 1. Madde",
        },
        {
          func: "*",
          description:
            "2. Maddeyi temsil eder. bkz; <ul><li> Kullanım; * Alt 1. Madde",
        },
        {
          func: "1.",
          description: "Sıralamayı temsil eder. Kullanım; 1. Birinci",
        },
        {
          func: "[Connection](url)",
          description:
            "Bağlantı almak için kullanılır. bkz; <a> Kullanım; [Sihirbaz Forum](https://sihirbazforum.com/)",
        },
        {
          func: "[Title Connection](url 'Title')",
          description:
            "Başlıklı bağlantı almak için kullanılır. bkz; <a> Kullanım; [Sihirbaz Forum](https://sihirbazforum.com/ 'Sihirbaz')",
        },
        {
          func: "[Referance n][n]",
          description:
            "Numara atamaları ile referans atanır. Kullanımı; [1]: https://sihirbazforum.com/",
        },
        {
          func: "|Table|",
          description:
            "Tablo oluşturmak için kullanılır. bkz; <table> Kullanımı; | | Tablo başlık 1 | Tablo başlık 2 |",
        },
      ],
      maths: [
        {
          func: "$",
          description: "Paragraf içi fonsiyon kullanımı. Kullanım; $ sqrt(5) $",
        },
        {
          func: "$$",
          description: "Sayfa ortası fonsiyon kullanımı",
        },
      ],
      diagrams: [
        {
          func: "-->",
          description: "Paragraf içi fonsiyon kullanımı. Kullanım; $ sqrt(5) $",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>