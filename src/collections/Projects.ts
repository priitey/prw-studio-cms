import type { Block, CollectionConfig } from 'payload'

const LinkBlock: Block = {
  slug: 'link',
  labels: {
    singular: 'Link',
    plural: 'Link Blocks',
  },
  fields: [
    {
      name: 'linkText',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
  ],
}

const VisualBlock: Block = {
  slug: 'visual',
  labels: {
    singular: 'Visual',
    plural: 'Visual Blocks',
  },
  fields: [
    {
      name: 'visual',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

const InsightBlock: Block = {
  slug: 'insight',
  labels: {
    singular: 'Insight',
    plural: 'Insights',
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      maxLength: 500,
      admin: {
        description: 'This is an insight. it could be a 10 word caption or a 100 word paragraph. It will offer an intimate porthole into the pre, mid and post phases of the project.',
      },
    },
  ],
}

export const Projects: CollectionConfig = {
  slug: 'project',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'blurb',
      type: 'richText',
    },
    {
      name: 'insight',
      label: 'Project Insights',
      type: 'blocks',
      blocks: [InsightBlock],
    },
    {
      name: 'visual',
      label: 'Project Visuals',
      type: 'blocks',
      blocks: [LinkBlock, VisualBlock],
    },
  ],
}