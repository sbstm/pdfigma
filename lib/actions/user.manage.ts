"use server";
import { Teams } from "node-appwrite";

const sdk = require("node-appwrite");

const client = new sdk.Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)

const teams = new Teams(client);


const handleAddMember = async (teamId :any, userId:any, email:any, roles:any) => {
  try {
    const response = await teams.createMembership(
      teamId,
      email,
      roles, 
    );
    console.log('Membership created successfully:', response);
  } catch (error) {
    console.error('Error creating membership:', error);
  }
};