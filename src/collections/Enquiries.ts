import type { CollectionConfig } from 'payload'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'businessId', 'status', 'createdAt'],
  },
  access: {
    create: () => true, // Anyone can enquire
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return {
        // Only owner or person who submitted (if logged in) can read
        // Simplified for now
      }
    },
  },
  fields: [
    {
      name: 'businessId',
      type: 'relationship',
      relationTo: 'businesses',
      required: true,
    },
    {
      name: 'userId',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'richText',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
    },
    {
      name: 'priority',
      type: 'select',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
      ],
      defaultValue: 'medium',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Resolved', value: 'resolved' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'new',
    },
    {
      name: 'response',
      type: 'richText',
    },
    {
      name: 'respondedBy',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'respondedAt',
      type: 'date',
    },
  ],
}
