import { Client, Account, Databases } from 'appwrite'

const client = new Client()
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

const auth = new Account(client)
const db = new Databases(client)

export { client, auth, db }