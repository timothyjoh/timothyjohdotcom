// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'

import tailwind from '@astrojs/tailwind'

import vercel from '@astrojs/vercel';

import sentry from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind({
    applyBaseStyles: false,
  }), sentry({
    dsn: "https://f5000fbbfc28bf36f33b9dffd3aec56f@o4506564404903936.ingest.us.sentry.io/4508964773756928",
    tracesSampleRate: 0,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    sourceMapsUploadOptions: {
      project: "timothyjohdotcom",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    },
  })],

  adapter: vercel(),
})
