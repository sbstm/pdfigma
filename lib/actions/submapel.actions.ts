'use server'

import { ID, Query } from 'node-appwrite'
import { createAdminClient } from '../appwrite'

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_SUB_MAPEL_COLLECTION_ID: SUB_MAPEL_COLLECTION_ID,
} = process.env


export async function readSubMapel(idData: string) {
    try {
      const { database } = await createAdminClient();
      const response = await database.listDocuments(
        DATABASE_ID!,
        SUB_MAPEL_COLLECTION_ID!,
        [Query.equal('$id', idData)]
      )
      return response
    } catch (error: any) {
      console.error(" Error read Submapel document:", error)
      if (error.response && error.response.status === 401) {
        // Unauthorized access
        throw new Error(
          ' Unauthorized: You are not allowed to read a Submapel. '
        )
      } else {
        // Generic error
        throw new Error(' Failed to read Submapel. ')
      }
    }
  }

  
  export async function selectSubMapel(name: string) {
    try {
      const { database } = await createAdminClient();
      const response = await database.listDocuments(
        DATABASE_ID!,
        SUB_MAPEL_COLLECTION_ID!,
        [
          Query.contains('name', name)
        ]
      )
      return response
    } catch (error: any) {
      console.error(" Error read Submapel document:", error)
      if (error.response && error.response.status === 401) {
        // Unauthorized access
        throw new Error(
          ' Unauthorized: You are not allowed to read a Submapel. '
        )
      } else {
        // Generic error
        throw new Error(' Failed to read Submapel. ')
      }
    }
  }

  