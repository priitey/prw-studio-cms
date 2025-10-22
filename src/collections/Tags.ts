import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'updatedAt'],
  },
  auth: false,
  access: {
    read: () => true, // <-- allow public fetch
  },
  fields: [
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: false,
      options: [
        { label: 'Speciality', value: 'speciality' },
        { label: 'Tool', value: 'tool' },
        { label: 'Aesthetic', value: 'aesthetic' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'name',
      label: 'Tag name',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}