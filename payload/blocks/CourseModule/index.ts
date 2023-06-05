import { Block } from "payload/types";
import richText from "../../fields/richText";
import Video from "@/components/Video";

export const CourseModule: Block = {
  slug: 'courseModule',
  labels: {
    singular: 'Module',
    plural: 'Modules',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    richText({
      name: "description",
    }),
    {
      name: "videoLink",
      label: "Vimeo Link",
      type: "ui",
      admin: {
        components: {
          Field: Video,
        },
      },
    },
  ]
}