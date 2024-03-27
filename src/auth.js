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


    async CreateAccount(id,email, password, name, phone) {
        try {

            const createAccount = await this.account.create(id, email, password, name)


            if (createAccount) {

                return 0
            }
            else {
                return 1

            }

        }
        catch (error) {
            console.log(error)
        }

    }
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
            console.log(data)
            return data
        }
        catch (err) {
            return 1
        }
        return 1
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
