import type { StructureResolver } from "sanity/desk";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage Sections")
        .child(
          S.list()
            .title("Homepage Sections")
            .items([
              S.documentTypeListItem("hero").title("Hero Section"),
              S.documentTypeListItem("aboutSection").title("About Section"),
              S.documentTypeListItem("missionVision").title("Mission & Vision"),
              S.documentTypeListItem("coreValues").title("Core Values Section"),
              S.documentTypeListItem("blogSection").title("Blog Section"),
              S.documentTypeListItem("gallerySliderSection").title(
                "Gallery Slider Section",
              ),
              S.documentTypeListItem("volunteerCtaSection").title(
                "Volunteer CTA Section",
              ),
            ]),
        ),
      S.listItem()
        .title("Donate Pages")
        .child(
          S.list()
            .title("Donate Pages")
            .items([
              S.documentTypeListItem("donatePage").title("Donate Page"),
              S.documentTypeListItem("donationPost").title("Campaigns"),
              S.documentTypeListItem("donateDetail").title("Donate Settings"),
            ]),
        ),
      S.listItem()
        .title("Projects Pages")
        .child(
          S.list()
            .title("Projects Pages")
            .items([
              S.documentTypeListItem("projectsPage").title("Projects Page"),
              S.documentTypeListItem("project").title("Projects"),
              S.documentTypeListItem("projectDetail").title("Project Detail"),
            ]),
        ),
      S.listItem()
        .title("Volunteer Pages")
        .child(
          S.list()
            .title("Volunteer Pages")
            .items([
              S.documentTypeListItem("volunteerPage").title("Volunteer Page"),
            ]),
        ),
      S.listItem()
        .title("Beneficiaries Pages")
        .child(
          S.list()
            .title("Beneficiaries Pages")
            .items([
              S.documentTypeListItem("servicePageCta").title(
                "Beneficiaries Page CTA",
              ),
            ]),
        ),
      S.listItem()
        .title("Gallery & Blog")
        .child(
          S.list()
            .title("Gallery & Blog")
            .items([
              S.listItem()
                .title("Gallery Page Settings")
                .child(
                  S.document()
                    .schemaType("galleryPage")
                    .documentId("galleryPageSettings"),
                ),
              S.documentTypeListItem("galleryItem").title("Gallery Items"),
              S.documentTypeListItem("blogPost").title("Blog Post"),
            ]),
        ),
      S.listItem()
        .title("Legal")
        .child(
          S.list()
            .title("Legal")
            .items([
              S.documentTypeListItem("privacyPolicy").title("Privacy Policy"),
            ]),
        ),
    ]);
