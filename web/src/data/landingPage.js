const client = require('../util/client')
const groq = require('groq')
const allBlocksToHtml = require('../util/allBlocksToHtml')

module.exports = async function() {
  const landingPage = await client.fetch(
    groq`
    *[_type == "landingPage"] {
      intro,
      "projects": *[_type == "project"] | order(metadata.year desc, metadata.semester, title) {
        title,
        subtitle,
        metadata,
        "slug": slug.current,
        "image": {
          ...image.image.asset->,
          "altText": image.altText,
        }
      },
      about,
      lab {
        facultySpotlight-> {
          ...,
          "slug": slug.current,
          "image": {
            ...image.image.asset->,
            "altText": image.altText,
            "caption": image.caption
          },
        },
        row1 {
          ...,
          "images": images[] {
            altText,
            ...image.asset->
          },
        },
        row2 {
          ...,
          "images": images[] {
            altText,
            ...image.asset->
          },
        }
      },
      people {
        "Faculty": *[_type == "person" && category == 'Faculty' && isAlum != true] | order(seq) {
          name,
          title,
          link
        },
        "students": *[_type == "person" && category == 'Student'] | order(name) {
          name
        },
        "formerUrops": *[_type == "person" && category == 'Former Members'] | order(name) {
          name,
        },
        "formerFaculty": *[_type == "person" && category == 'Faculty' && isAlum] | order(seq) {
          name,
          title,
          link
        },
        steeringCommittee[]-> {
          name,
          title,
          link
        },
      },
      "events": *[_type == 'event'] [0..3] | order(metadata.startDatetime) {
        title,
        "slug": slug.current,
        "image": {
          ...image.image.asset->,
          "altText": image.altText,
          "caption": image.caption
        },
        ...metadata
      },
      community {
        accordion,
        "publications": *[_type == 'publication'] | order(publicationDate desc)
      },
      footer {
        ...,
        "mellonLogo": {
          ...mellonLogo.image.asset->,
          "altText": mellonLogo.altText,
          "caption": mellonLogo.caption
        },
      },
   } [0]`,
  )

  return allBlocksToHtml(landingPage)
}
