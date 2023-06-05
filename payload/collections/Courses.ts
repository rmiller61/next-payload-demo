import { CollectionConfig } from 'payload/types';
import { publishedOnly } from '../access/publishedOnly';
import { CallToAction } from '../blocks/CallToAction';
import { Content } from '../blocks/Content';
import { MediaBlock } from '../blocks/Media';
import { slugField } from '../fields/slug';
import { regenerateStaticPage } from '../utilities/regenerateStaticPage';
import ProductLinker from "../../components/ProductLinker"
import { CourseModule } from '../blocks/CourseModule';
import richText from "../fields/richText";

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (doc, { locale }) => {
      if (doc?.slug) {
        return `/${doc.slug}${locale ? `?locale=${locale}` : ""}`;
      }

      return '';
    },
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  hooks: {
    afterChange: [
      regenerateStaticPage
    ]
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
        name: 'description',
        type: 'richText',
    },
    {
        name: "product",
        label: "Stripe Product",
        type: "json",
        required: true,
        admin: {
          components: {
            Field: ProductLinker,
          },
        },
      },
      {
        name: 'chapters',
        type: 'array',
        required: true,
        labels: {
          singular: 'Chapter',
          plural: 'Chapters',
        },
        fields: [
          {
            name: 'title',
            type: 'text',
            required: true,
          },
          {
            name: 'vimeoLink',
            type: 'text',
            required: true,
          },
          richText({
            name: "description",
          }),
          /**{
            name: "videoLink",
            label: "Vimeo Link",
            type: "ui",
            admin: {
              components: {
                Field: Video,
              },
            },
          },**/
        ]
      },
      {
        name: 'published', // required
        type: 'checkbox', // required
        label: 'Check to publish this course',
        defaultValue: false,
        admin: {
          position: 'sidebar',
        }
      },
    slugField(),
  ]
}