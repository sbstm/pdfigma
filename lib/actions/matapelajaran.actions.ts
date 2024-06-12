'use server'

import { ID, Query } from 'node-appwrite'
import { cookies } from 'next/headers'
import { createAdminClient } from '../appwrite'
import { revalidatePath } from 'next/cache'

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_MATAPELAJARAN_COLLECTION_ID: MATAPELAJARAN_COLLECTION_ID,
} = process.env
export async function createMatapelajaran(data: any) {
  try {
    const documentId = ID.unique()
    const adminClient = await createAdminClient()
    const response = await adminClient.database.createDocument(
      DATABASE_ID!,
      MATAPELAJARAN_COLLECTION_ID!,
      ID.unique(),
      data
    )

    return response
  } catch (error: any) {
    console.error('Error creating Matapelajaran document:', error)
    if (error.response && error.response.status === 401) {
      // Unauthorized access
      throw new Error(
        'Unauthorized: You are not allowed to create a Matapelajaran.'
      )
    } else {
      // Generic error
      throw new Error('Failed to create Matapelajaran.')
    }
  }
}

export async function readMatapelajaran(data: any) {
  try {
    const adminClient = await createAdminClient()
    const response = await adminClient.database.listDocuments(
      DATABASE_ID!,
      MATAPELAJARAN_COLLECTION_ID!,
      data
    )

    return response
  } catch (error: any) {
    if (error.response) {
      const appwriteError = error.response as unknown as {
        code: number
        message: string
      }

      console.error(
        'Error creating Matapelajaran document:',
        appwriteError.code,
        appwriteError.message
      )

      // Handle specific Appwrite error codes (examples)
      if (appwriteError.code === 400) {
        throw new Error('Schema validation failed for data')
      } else if (appwriteError.code === 401) {
        throw new Error('Unauthorized access')
      }

      // Rethrow other Appwrite errors with their original message
      throw new Error(appwriteError.message)
    } else {
      console.error('An unexpected error occurred:', error)
    }

    // Rethrow a generic error to the client
    throw new Error('Failed to create Matapelajaran. Please try again.')
  }
}
