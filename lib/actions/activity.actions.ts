"use server";

import { ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { createAdminClient } from "../appwrite";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_ACTIVITY_COLLECTION_ID: ACTIVITY_COLLECTION_ID,
} = process.env;

export async function createActivity(data: any) {
  try {
    const adminClient = await createAdminClient();
    const response = await adminClient.database.createDocument(
      DATABASE_ID!,
      ACTIVITY_COLLECTION_ID!,
      ID.unique(),
      data
    );
    return response;
  } catch (error: any) {
    console.error("Error creating Activity document:", error);
    if (error.response && error.response.status === 401) {
      // Unauthorized access
      throw new Error(
        "Unauthorized: You are not allowed to create a Activity."
      );
    } else {
      // Generic error
      throw new Error("Failed to create Activity.");
    }
  }
}
