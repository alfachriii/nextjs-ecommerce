import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export const secureClient = createClient({
  projectId,
  dataset: process.env.SANITY_PRIVATE_DATASET,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  //  revalidation
  token: process.env.SANITY_API_TOKEN,
});
