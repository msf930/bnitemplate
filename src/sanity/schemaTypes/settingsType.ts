
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Chapter Settings',
  type: 'document',
  
  fields: [
    defineField({
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
      initialValue: 'main-settings',
      readOnly: true,
      hidden: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'chapterName',
      title: 'Chapter Name',
      type: 'string',
      description: 'The name of your BNI chapter',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'officialURL',
      title: 'Official BNI Website URL',
      type: 'url',
      description: 'The official BNI website URL for your chapter',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'visitURL',
      title: 'Visitor Registration URL',
      type: 'url',
      description: 'The URL for visitors to register to attend a meeting',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Chapter Logo',
      type: 'image',
      description: 'The logo for your BNI chapter',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
  
  preview: {
    select: {
      title: 'chapterName',
      media: 'logo',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'Settings',
        subtitle: 'Chapter configuration',
        media: media,
      }
    },
  },
})
