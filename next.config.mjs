// @ts-check
import path from "path"
import { withPayload } from "@payloadcms/next-payload"
import { fileURLToPath } from 'url';

/**
 * Fix for `__dirname` and `__filename` not being defined in ES modules.
 * See: https://codingbeautydev.com/blog/javascript-dirname-is-not-defined-in-es-module-scope/
 */

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
//!process.env.SKIP_ENV_VALIDATION && (await import("./env/index.mjs"))

/** @type {import("next").NextConfig} */
const config = withPayload(
  {
    eslint: {
      ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
    images: {
      domains: [
        "localhost",
        process.env.NEXT_PUBLIC_APP_URL,
        `${process.env.NEXT_PUBLIC_S3_ENDPOINT}`.replace("https://", ""),
      ],
    },
  },
  {
    configPath: path.resolve(__dirname, "./payload/payload.config.ts"),
  }
)
export default config
