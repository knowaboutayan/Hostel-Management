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
    async memberAdd(name, phone, email) {
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
            alert(err)
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
        catch (error) {
            alert("error" + error)
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
        dataBaseId,collectionId,docId

    ) {
        try {
           const data = await this.databases.deleteDocument(dataBaseId,collectionId,docId)
           if(data==0){
            alert("deleted")
           }
            return 0
        }
        catch (err) {
            alert(err)
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
            console.log(userId, userName, dateAndTime, text)
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
            console.log(data)
            if (data) {
                console.log(data["documents"])
                return data["documents"]
            }
            else {
                return 1
            }
        }
        catch (err) {
            alert(err)
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
        catch (error) {
            console.log('upload', data);
        }
    }


}




const database = new Database()
export default database