import { Account, Client } from "appwrite";
import conf from "./conf/conf";



class Admin {
    client = new Client();
    account
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId)
        this.account = new Account(this.client)
    }

    async Login(email, password, name ) {
        try {
            const userAccount = await this.account.createEmailPasswordSession(email, password);
            if (userAccount) {
                return userAccount
            }

            else {
                return 1
            }
        }
        catch (err) {
            console.error("Error creating account:", err);
            return 1
        }
    }
}
const admin = new Admin()
export default admin