import { Directus, ID } from '@directus/sdk'

const directusUrl = process.env.DIRECTUS_URL || 'http://localhost:8055'

// Define types for Dircetus collections
export type Ilip = {
  slug: string
  content: string
}

type Mpi = {
  id: ID
  content: string
}

// Map your collections to its respective types. The SDK will
// infer its types based on usage later.
type DirectusCollection = {
  ilip: Ilip
  mpi: Mpi
}

const directus = new Directus<DirectusCollection>(directusUrl)

export async function getDirectusClient() {
  return directus
}
