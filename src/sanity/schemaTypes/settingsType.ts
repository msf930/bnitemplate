
import { defineField, defineType } from 'sanity'

export const settingsType = defineType({
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
      
    }),
    defineField({
      name: 'chapterName',
      title: 'Chapter Name',
      type: 'string',
      description: 'The name of your BNI chapter',
      
    }),
    defineField({
      name: 'officialURL',
      title: 'Official BNI Website URL',
      type: 'url',
      description: 'The official BNI website URL for your chapter',
      
    }),
    defineField({
      name: 'visitURL',
      title: 'Visitor Registration URL',
      type: 'url',
      description: 'The URL for visitors to register to attend a meeting',
      
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
          
        },
      ],
    }),
  ]
  
  
})
