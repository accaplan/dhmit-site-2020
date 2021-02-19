import S from '@sanity/desk-tool/structure-builder'
import React from 'react'
import Emoji from 'react-emoji-render'

export default () =>
  S.list()
    .title('How to Make Space')
    .items([
      S.listItem()
        .title('Landing Page')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🏠" />)
        .child(
          S.editor()
            .title('Landing Page')
            .schemaType('landingPage')
            .documentId('landingPage'),
        ),
      S.listItem()
        .title('Configuration')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🌎" />)
        .child(
          S.editor()
            .title('Config')
            .schemaType('config')
            .documentId('config'),
        ),

      S.divider(),

      S.listItem()
        .title('Projects')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="💻" />)
        .child(S.documentTypeList('project').title('Projects')),
      S.listItem()
        .title('People')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🤸‍" />)
        .child(S.documentTypeList('person').title('People')),
      S.listItem()
        .title('Events')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🗓️" />)
        .child(S.documentTypeList('event').title('Events')),
      S.listItem()
        .title('Faculty Spotlight')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="✨" />)
        .child(
          S.documentTypeList('facultySpotlight').title('Faculty Spotlight'),
        ),
      S.listItem()
        .title('Publications')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="📔" />)
        .child(S.documentTypeList('publication').title('Publications')),
      S.listItem()
        .title('Calls')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="📔" />)
        .child(S.documentTypeList('call').title('Calls')),
    ])
