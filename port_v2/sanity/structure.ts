import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
const LANGUAGES = [
  { title: "Indonesia", value: "id" },
  { title: "English", value: "en" },
];

const filteredList = (S: any, type: string, lang: string) =>
  S.documentList()
    .title(`${type.toUpperCase()} (${lang.toUpperCase()})`)
    .filter(`_type == $type && language == $lang`)
    .params({ type, lang });

const globalList = (S: any, type: string) =>
  S.documentList()
    .title(type.charAt(0).toUpperCase() + type.slice(1))
    .filter(`_type == $type`)
    .params({ type });

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...LANGUAGES.map((lang) =>
        S.listItem()
          .title(lang.title)
          .child(
            S.list()
              .title(`Content (${lang.title})`)
              .items([
                S.listItem()
                  .title("Hero")
                  .child(filteredList(S, "hero", lang.value)),

                S.listItem()
                  .title("About")
                  .child(filteredList(S, "about", lang.value)),

                S.listItem()
                  .title("Blog")
                  .child(filteredList(S, "blog", lang.value)),

                S.listItem()
                  .title("Project")
                  .child(filteredList(S, "project", lang.value)),

                S.listItem()
                  .title("Education")
                  .child(filteredList(S, "education", lang.value)),

                S.listItem()
                  .title("Experience")
                  .child(filteredList(S, "experience", lang.value)),
              ])
          )
      ),

      S.divider(),
      S.listItem()
        .title("Global Content")
        .child(
          S.list()
            .title("Global Content")
            .items([
              S.listItem()
                .title("Certification")
                .child(globalList(S, "certification")),
              S.listItem().title("Category").child(globalList(S, "category")),
            ])
        ),
    ]);
