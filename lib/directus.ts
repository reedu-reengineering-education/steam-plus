import { Directus, ID } from '@directus/sdk'

const directusUrl =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'

// Define types for Dircetus collections
export type Ilip = {
  slug: string
  content: string
}

export type Line = {
  id: ID
  name: string
  label: string
  description: string
  markdown?: string
}

export type Mpi = {
  id: ID
  category: string
  title: string
  slug: string
  markdown: string
}

export type Menu = {
  id: ID
  category: string
  description: string
}

export type Glossary = {
  id: ID
  term: string
  description: string
}

// Map your collections to its respective types. The SDK will
// infer its types based on usage later.
type DirectusCollection = {
  lines: Line
  ilip: Ilip
  mpi: Mpi
  menu: Menu
  glossary: Glossary
}

const directus = new Directus<DirectusCollection>(directusUrl)

export async function getDirectusClient() {
  return directus
}
