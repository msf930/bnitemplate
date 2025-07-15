import {defineField, defineType} from 'sanity'

export const memberType = defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastName',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
        
      },
    }),
    defineField({
      name: 'email',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      type: 'string',
    }),
    defineField({
      name: 'company',
      type: 'string',
    }),
    defineField({
      name: 'position',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      type: 'text',
    }),
    defineField({
      name: 'linkedin',
      type: 'string',
    }), 
    defineField({
      name: 'instagram',
      type: 'string',
    }),
    defineField({
      name: 'facebook',
      type: 'string',
    }),
    defineField({
      name: 'website',
      type: 'string',
    })
    
  ],
})