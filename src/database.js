import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "./conf/conf";
import authService from "./auth";


class Database {
    client = new Client()
    databases;
    storage;
    constructor() {
        this.client.setEndpoint('https://cloud.appwrite.io/v1').setProject(conf.projectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }


    async memberAdd({ name, email, phone, password }) {
        try {

            const add = await this.databases.createDocument(
                String(conf.dataBaseId),
                String(conf.collectionId),
                ID.unique(),
                {
                    name,
                    phone,
                    email,
                }

            )


            if (add) {
                return 0
            }
            else {
                return 1
            }


        }
        catch (error) {

            return 1
        }

    }

    async getMembersShow() {
        try {
            const members = await this.databases.listDocuments(
                conf.dataBaseId,
                conf.collectionId
            )

            return members


        }
        catch (err) {
            if (err['AppwriteException'] == " Network request failed)") {
                return 'netErr'
            }
            return 1

        }
    }

    async newExpenseAdd({ Name = "f", UserID = "demo-User", Vegetable, Grocery, Fish, Egg, Meat, submitDate, TotalCost }) {
        try {
            const addExpense = await this.databases.createDocument(
                conf.dataBaseId,
                conf.expenseId,
                ID.unique(),
                {
                    Name, UserID, Vegetable, Grocery, Fish, Egg, Meat, submitDate, TotalCost
                }
            )

            if (addExpense) {
                return 0
            }
            else {
                return 1
            }

        }
        catch (err) {
            if (err['AppwriteException'] == " Network request failed)") {
                return 'netErr'
            }
            return 1

        }

    }

    async updateNewExpence(
        docId

    ) {
        try {
            await this.databases.updateDocument(conf.dataBaseId, conf.expenseId, docId)
            return 0
        }
        catch (err) {
            return 1
        }
    }

    async deleteDocuments(
        dataBaseId, collectionId, docId

    ) {
        try {
            const data = await this.databases.deleteDocument(dataBaseId, collectionId, docId)
            if (data == 0) {
                alert("deleted")
            }
            return 0
        }
        catch (err) {
            if (err['AppwriteException'] == " Network request failed)") {
                return 'netErr'
            }
            return 1

        }
    }


    async getAllExpenses() {
        try {
            const data = await this.databases.listDocuments(
                conf.dataBaseId,
                conf.expenseId
            )

            if (data) {

                return data
            }
            else {
                return 1
            }
        }
        catch (err) {
            return 1
        }
    }

    async newChatAdd({ userId, userName, dateAndTime, text }) {
        try {

            const data = await this.databases.createDocument(
                conf.dataBaseId,
                conf.chatId,
                ID.unique(),
                {

                    userId, userName, dateAndTime, text
                })
            if (data) {
                return 0
            }
            else {
                return (1)
            }

        }
        catch (err) {
            return 1
        }
    }

    async getChat() {
        try {
            const data = await this.databases.listDocuments(
                conf.dataBaseId,
                conf.chatId
            )

            if (data) {

                return data["documents"]
            }
            else {
                return 1
            }
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

    //function forgeneral data fetched 
    async fetchCollectionData({ dataBaseId = conf.dataBaseId, collectionId = collectionId }) {
        try {
            const data = await this.databases.listDocuments(
                dataBaseId,
                collectionId,
            )
         
            return data['documents']
        }
        catch (err) {
            if (err['AppwriteException'] == " Network request failed)") {
                return 'netErr'
            }
            return 1

        }

    }

    async uploadProfilePic(file) {
        try {
            const data = await this.storage.createFile(
                conf.bucketId,
                ID.unique,
                file
            )
            console.log('upload', data)
        }
        catch (err) {
            if (err['AppwriteException'] == " Network request failed)") {
                return 'netErr'
            }
            return 1

        }
    }
}
const database = new Database()
export default database