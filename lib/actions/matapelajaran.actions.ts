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

export async function readMatapelajaranSiswa( kelas: string) {
  try {
    const { database } = await createAdminClient();
    const response = await database.listDocuments(
      DATABASE_ID!,
      MATAPELAJARAN_COLLECTION_ID!,
      [Query.equal("kelas", kelas)]
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
