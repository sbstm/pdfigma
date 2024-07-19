'use server'

import { ID, Query } from 'node-appwrite'
import { cookies } from 'next/headers'
import { createAdminClient } from '../appwrite'
import { revalidatePath } from 'next/cache'
import { parseStringify } from '../utils'

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_MATAPELAJARAN_COLLECTION_ID: MATAPELAJARAN_COLLECTION_ID,
} = process.env

export async function createMatapelajaran(data: MapelParams) {
  const { name, kelas,deskripsi,image_url} = data
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

export async function readMatapelajaran() {
  try {
    const { database } = await createAdminClient();
    const response = await database.listDocuments(
      DATABASE_ID!,
      MATAPELAJARAN_COLLECTION_ID!,
    )
    return response
  } catch (error: any) {
    console.error('Error creating Matapelajaran document:', error)
    if (error.response && error.response.status === 401) {
      // Unauthorized access
      throw new Error(
        'Unauthorized: You are not allowed to read a Matapelajaran.'
      )
    } else {
      // Generic error
      throw new Error('Failed to read Matapelajaran.')
    }
  }
}
