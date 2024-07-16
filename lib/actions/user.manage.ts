const sdk = require("node-appwrite");

const client = new sdk.Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
  .setKey(process.env.APPWRITE_API_KEY!);

const users  = new sdk.Users(client);

export async function updateLabel(userId: string) {
  try {
    const promise = users.updateLabels(
      userId,
      [ 'guru' ]
  );
    console.log(`Label updated for user ${userId}`);
  } catch (error) {
    console.error(`Error updating label for user ${userId}:`, error);
  }
}
