import { buildConfig } from 'payload/config';
import path from 'path';
import { Users } from './collections/Users';
import { Pages } from './collections/Pages';
import { MainMenu } from './globals/MainMenu';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';
import { Media } from './collections/Media';
import { Courses } from './collections/Courses';
import { stripeREST } from "./routes/stripe"

const mockModulePath = path.resolve(__dirname, "mocks/serverModule.js")

const adapter = s3Adapter({
  config: {
    endpoint: process.env.NEXT_PUBLIC_S3_ENDPOINT,
    region: process.env.S3_REGION,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    }
  },
  bucket: process.env.NEXT_PUBLIC_S3_BUCKET as string,
})

export default buildConfig({
  admin: {
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          stripe: mockModulePath,
          [path.resolve(__dirname, "./routes/stripe")]: mockModulePath,
        },
      },
    }),
  },
  collections: [
    Pages,
    Users,
    Media,
    Courses,
  ],
  globals: [
    MainMenu,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, '../payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  endpoints: [
    {
      path: "/stripe/rest",
      method: "get",
      handler: (req, res, next) => {
        stripeREST({
          req,
          res,
          next,
        })
      },
    },
  ],
  plugins: [
    cloudStorage({
      collections: {
        'media': {
          adapter,
          disablePayloadAccessControl: true,
        }
      },
    }),
  ],
});
