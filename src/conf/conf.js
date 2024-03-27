const conf = {
    appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
    projectId: String(import.meta.env.VITE_PROJECT_ID),
    dataBaseId: String(import.meta.env.VITE_DATABASE_ID),
    collectionId: String(import.meta.env.VITE_COLLECTION_ID),
    expenseId: String(import.meta.env.VITE_EXPENSE_COLLECTION_ID),
    otherExpenseId: String(import.meta.env.VITE_OTHER_EXPENSE_COLLECTION_ID),
    chatId: String(import.meta.env.VITE_CHAT_COLLECTION_ID),
    bucketId:String(import.meta.env.VITE_BUCKET_ID),
    depositId:String(import.meta.env.VITE_DEPOSIT_COLLECTION_ID)
}
export default conf