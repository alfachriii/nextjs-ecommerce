import { createClient } from 'next-sanity'

import { apiVersion, publicDataset, projectId, privateDataset } from '../env'

export const client = createClient({
  projectId,
  dataset: publicDataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: process.env.SANITY_API_READ_TOKEN
})

export const secureClient = createClient({
  projectId,
  dataset: privateDataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  //  revalidation
  token: process.env.SANITY_API_TOKEN,
});
