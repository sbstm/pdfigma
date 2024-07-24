"use server";
import { Client, ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(user.documents[0]);
  } catch (error) {
    throw new Error("Could not fetch user info");
  }
};

export const signOut = async () => {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");
    cookies().delete("appwrite-session");
  } catch (error) {
    console.error("Error signing out:", error);
    throw new Error("Could not sign out");
  }
};
export async function getUserClass(kelas: string) {
  try {
    const { database } = await createAdminClient();
    const users = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("kelas", [kelas])]
    );
    return parseStringify(users.documents);
  } catch (error) {
    console.error("Error getting user class:", error);
    throw new Error("Could not get user class");
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id });

    return parseStringify(user);
  } catch (error) {
    console.log("Error getting logged in user:", error);
    return null;
  }
}

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    const user = await getUserInfo({ userId: session.userId });
    if (user.role === "siswa") {
      cookies().set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
      return parseStringify(user);
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error("Could not sign in");
  }
};

export const signUp = async ({ password, ...userData }: any) => {
  const { email, firstName, lastName, name, role, jk, tanggal_lahir } =
    userData;

  let newUserAccount;

  try {
    const { account, database } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    if (!newUserAccount) throw new Error("Error creating user");

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
      }
    );
    return parseStringify(newUser);
  } catch (error) {
    console.error("Error", error);
  }
};

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");

    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
};
