"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_NILAI_COLLECTION_ID: NILAI_COLLECTION_ID,
} = process.env;



export async function getNilaiSiswa(matapelajaran: string, user: string) {
  try {
    const { database } = await createAdminClient();
    const data = await database.listDocuments(
      DATABASE_ID!,
      NILAI_COLLECTION_ID!,
      [Query.equal('matapelajaran', matapelajaran), Query.equal('user', user)]
    );
    return data
  } catch (error: any) {
    console.error("Error creating Nilai document:", error);
    if (error.response && error.response.status === 401) {
      throw new Error("Unauthorized: You are not allowed to read a Nilai.");
    } else {
      throw new Error("Failed to read Nilai.");
    }
  }
}

export async function updateNilai(documentId: string, newValues: number[]) {
  try {
    const { database } = await createAdminClient()
    const payload = {
      value: newValues,
      // Tambahkan field lain jika diperlukan (misalnya, tanggal update)
    };
    const response = await database.updateDocument(
      DATABASE_ID!,
      NILAI_COLLECTION_ID!,
      documentId,
      payload
    );
    return response;
  } catch (error: any) {
    console.error("Error creating Nilai document:", error);
    if (error.response && error.response.status === 401) {
    // Unauthorized access
    throw new Error("Unauthorized: You are not allowed to create a Nilai.");
    } else {
    // Generic error
    throw new Error("Failed to create Nilai.");
    }
}
}


export async function initNilai(data: NilaiParams) {
    try {
        const { database } = await createAdminClient()
        const response = await database.listDocuments(
          DATABASE_ID!,
          NILAI_COLLECTION_ID!,
        );
        return response;
    } catch (error: any) {
        console.error("Error creating Nilai document:", error);
        if (error.response && error.response.status === 401) {
        // Unauthorized access
        throw new Error("Unauthorized: You are not allowed to create a Nilai.");
        } else {
        // Generic error
        throw new Error("Failed to create Nilai.");
        }
    }
    }