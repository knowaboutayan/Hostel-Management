const conf = {
    appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
    projectId: String(import.meta.env.VITE_PROJECT_ID),
    dataBaseId: String(import.meta.env.VITE_DATABASE_ID),
    collectionId: String(import.meta.env.VITE_MEMBERS_COLLECTION_ID),
    expenseId: String(import.meta.env.VITE_EXPENSE_COLLECTION_ID),
    otherExpenseId: String(import.meta.env.VITE_OTHER_EXPENSE_COLLECTION_ID),
    chatId: String(import.meta.env.VITE_CHAT_COLLECTION_ID),
    bucketId: String(import.meta.env.VITE_BUCKET_ID),
    depositId: String(import.meta.env.VITE_DEPOSIT_COLLECTION_ID),
    userAPI: String(import.meta.env.VITE_APPWRITE_USER_API),

    adminProjectId: String(import.meta.env.VITE_ADMIN_PROJECT_ID),
    adminBatabaseId: String(import.meta.env.VITE_ADMIN_DATABASE_ID),
    adminCollectionId: String(import.meta.env.VITE_ADMIN_COLLECTION_ID),
    transactionCollectionId: String(import.meta.env.VITE_ALL_TRANSACTION_COLLECTION_ID)
}


export default conf