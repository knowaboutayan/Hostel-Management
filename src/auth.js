import { Account, Client, ID, Teams } from "appwrite"
import conf from "./conf/conf"

class AuthService {
    client = new Client()
    account;
    teams;

    constructor() {

        this.client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject(conf.projectId)
        this.account = new Account(this.client)
        this.teams = new Teams(this.client)
    }


    // async CreateAccount(email, password, name, phone) {
    //     try {
    //         console.log(email, password, name, phone);
    //         const createAccount = await this.account.create(ID.unique(), email, password, name);

    //         if (createAccount) {
    //             alert("success")
    //             return 0;
    //         } else {
    //             return 1;
    //         }
           
    //     } catch (error) {
    //         console.error(error);
    //         return -1; // Return a custom error code or handle the error appropriately
    //     }
    // }


    async Login(email, password) {
        try {
            const accountLogin = await this.account.createEmailPasswordSession(String(email), String(password))
            if (accountLogin) {
                return accountLogin
            }
            else {
                return 1
            }
        }
        catch (error) {
            return 1
        }
    }

    async getCurrentUser() {
        try {
            const data = await this.account.get()
      
            return data
        }
        catch (err) {
            return 1
        }

    }

    async logout() {
        try {

            return await this.account.deleteSessions('current')
        }
        catch (err) {
            console.log("error");
        }
        console.log(null)
    }
}

const authService = new AuthService()

export default authService
