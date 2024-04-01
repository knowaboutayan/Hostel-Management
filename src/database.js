import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "./conf/conf";




class Database {
    client = new Client()
    databases;
    storage;
    constructor() {
        this.client.setEndpoint('https://cloud.appwrite.io/v1').setProject(conf.projectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    //add Expenses To Database Collection (GENERAL METHOD)
    async addToCollection(collectionId, object) {
        try {
            const response = await this.databases.createDocument(
                conf.dataBaseId,
                collectionId,
                ID.unique(),
                object

            )
            if (response.$id != '') {
                console.log("newExpenseAdded", response);
                return 0
            }
            return 1
        }
        catch (error) {
            console.log("add new collection", error)
        }
    }

    //end... new deposit 
    async getListOfDocuments(collectionId, query = []) {//listDocumentsGLobal FUNCTION
        try {
            const list = await this.databases.listDocuments(

                conf.dataBaseId,
                collectionId,

            )
            console.log(list)
            return list
        }
        catch (error) {
            console.log("Error in listDocumets::", error);
        }
    }

    // Import the Query object from your query library

    async getTotalTransaction() {
        try {
            const response = await this.databases.listDocuments(
                conf.dataBaseId,
                conf.transactionCollectionId,

            );

            let totalDebit = 0
            let totalCredit = 0
            if (response) {
                response.documents.map((obj) => {
                    if (obj['type'] === 'debit')
                        totalDebit += Number(obj['amount'])
                    else if (obj['type'] === 'credit')
                        totalCredit += Number(obj['amount'])
                })

                console.log(totalCredit, totalDebit)
                return { totalDebit: totalDebit, totalCredit: totalCredit }
            }
            else {
                return 1
            }

        } catch (error) {

            console.log("GET TOTAL::", error);
            return 1
        }
    }





    async deleteDocuments(
        dataBaseId, collectionId, docId

    ) {
        try {
            const data = await this.databases.deleteDocument(dataBaseId, collectionId, docId)
            if (data.$id != '') {
                return 0
            }
            return 1
        }
        catch (err) {
            if (err['AppwriteException'] == " Network request failed)") {
                return 'netErr'
            }
            return 1

        }
    }




    async newDepositAdd({ memberName, amount, userId }) {
        try {

            await this.databases.createDocument(
                conf.dataBaseId,
                conf.depositId,
                ID.unique(),

                {
                    memberName, amount, userId
                }
            )
            return 0
        }
        catch (err) {
            if (err['AppwriteException'] == " Network request failed)") {
                return 'netErr'
            }
            return 1

        }

    }



    async uploadProfilePic(id, file) {
        try {
            const response = await this.storage.createFile(

                conf.bucketId,
                id,//current user id..
                file
            )
            console.log("upload image", response)
            if (response.$id != '')
                return 0
            return 1
        }
        catch (err) {
            if (err['AppwriteException'] == " Network request failed)") {
                return 'netErr'
            }
            console.log(err)
            return err
        }
    }

    async deleteProfilePic(fileId) {
        try {
            const response = await this.storage.deleteFile(
                conf.bucketId,
                String(fileId)
            )

            if (response.$id != '')
                return 0
            return 1
        }
        catch (err) {
            if (err['AppwriteException'] == " Network request failed)") {
                return 'netErr'
            }

            return err
        }
    }

    async getProfilePic(fileId) {
        try {
            const response = this.storage.getFilePreview(
                conf.bucketId,
                fileId
            )

            if (response) {
                console.log("preview", response)
                return response.href
            }

            return 1

        }
        catch (err) {
            console.log("getPic::", err)
            return 1
        }
    }

}
const database = new Database()
export default database