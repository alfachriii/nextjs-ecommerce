'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, publicDataset, privateDataset, projectId} from './sanity/env'
import {publicSchema} from './sanity/schemaTypes/public'
import {privateSchema} from './sanity/schemaTypes/private'
import {structure} from './sanity/structure'

export default defineConfig([
  {
    name: 'Public',
    projectId,
    dataset: publicDataset,
    // Workspace utama akan diakses di http://localhost:3000/studio
    basePath: '/studio/public', 
    plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({
      defaultApiVersion: apiVersion,
      defaultDataset: privateDataset
    }),
  ],
    schema: publicSchema,
  },
  {
    name: 'Private',
    projectId,
    dataset: privateDataset,
    basePath: '/studio/private', 
    plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({
      defaultApiVersion: apiVersion,
      defaultDataset: privateDataset
    }),
  ],
    schema: privateSchema,
  }
])
