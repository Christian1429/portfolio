'use client';

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { RocketIcon } from '@sanity/icons';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Portfolio Studio',
  subtitle: 'Content Management',

  // Custom studio icon
  icon: RocketIcon,

  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,

  plugins: [
    structureTool({
      structure,
      title: 'Content',
    }),
    presentationTool({
      previewUrl: {
        initial: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({
      defaultApiVersion: apiVersion,
      title: 'GROQ',
    }),
  ],
});
