"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_ACTIVITY_COLLECTION_ID: ACTIVITY_COLLECTION_ID,
} = process.env;

export async function readActivity(idData: string) {
  try {
    const { database } = await createAdminClient();
    const response = await database.listDocuments(
      DATABASE_ID!,
      ACTIVITY_COLLECTION_ID!,
      [Query.equal("subMapel", idData)]
    );
    return response;
  } catch (error: any) {
    console.error("Error read Activity document:", error);
    if (error.response && error.response.status === 401) {
      // Unauthorized access
      throw new Error("Unauthorized: You are not allowed to read a Activity.");
    } else {
      // Generic error
      throw new Error("Failed to read Activity.");
    }
  }
}



