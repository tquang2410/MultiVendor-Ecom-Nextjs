import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // {
    //   name: 'email',
    //   type: 'email',
    //   required: true,
    // },
    {
      name: 'username',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'vendor', 'customer'],
      defaultValue: 'customer',
      required: true,
    },
  ],
}
