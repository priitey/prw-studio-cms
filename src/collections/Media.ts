import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  admin: {
    hidden: false,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    adminThumbnail: 'mobile',
    imageSizes: [
      {
        name: 'desktop',
        width: 1920,
        height: 1920,
        fit: 'inside',
        position: 'center',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
      {
        name: 'tablet',
        width: 1024,
        height: 1024,
        fit: 'inside',
        position: 'center',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 65,
          },
        },
      },
      {
        name: 'mobile',
        width: 720,
        height: 720,
        fit: 'inside',
        position: 'center',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 45,
          },
        },
      },
      {
        name: 'thumbnail',
        width: 100,
        height: 100,
        fit: 'cover',
        position: 'center',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 30,
          },
        },
      },
      {
        name: 'square',
        width: 500,
        height: 500,
        fit: 'cover',
        position: 'center',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      }
    ],
    mimeTypes: ['image/*', 'video/*'],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85,
      },
    },
  },
}