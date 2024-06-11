const sdk = require('node-appwrite')

const client = new sdk.Client()

const databases = new sdk.Databases(client)

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT) // Your project ID
  .setKey(process.env.NEXT_APPWRITE_KEY) // Your secret API key

const promise = databases.createCollection(
  process.env.APPWRITE_DATABASE_ID,
  process.env.APPWRITE_MATAPELAJARAN_COLLECTION_ID,
  'Matapelajaran'
)


promise.then(
  function (response: any) {
    console.log(response)
  },
  function (error: any) {
    console.log(error)
  }
)
