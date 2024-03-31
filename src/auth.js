import { Account, Client, ID, Teams } from "appwrite"
import conf from "./conf/conf"
import { useDispatch } from "react-redux";
import { haveProfilePic, userInfo } from "./store/slice";

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

    //accout create
    async CreateAccount({ email, password, name, phone }) {
        try {

            const createAccount = await this.account.create(ID.unique(), email, password, name, String(phone));

            if (createAccount) {

                return 0;
            }
            else {
                return 1;
            }

        } catch (error) {
            alert(error);
            console.log("CreateAccounr:::", error)
            return -1; // Return a custom error code or handle the error appropriately
        }
    }



    async Login(email, password) {//member login
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


    }


    async logout() {

        try {


            return await this.account.deleteSessions('current')


        }
        catch (err) {
            console.log("authService/logout()::", err);
        }

    }

    async emailVerification() {
        try {
            const response = await this.account.createVerification('https://hostel-management-lilac.vercel.app/emailVerification');
            console.log(response)
        }
        catch (error) {
            console.log("Email verify", error)
        }
    }

    async updateEmailVerification({ userId, secret }) {
        try {
            const response = this.account.updateVerification(userId, secret)
            if (response) {
                return 0
            }
            return 1

        }
        catch (error) {

            console.log("emailVerification::", error)
            return 1
        }
    }


    async forgetPassword({ email }) {
        try {
            const recover = await this.account.createRecovery(email, "https://hostel-management-lilac.vercel.app/resetPassword")
            console.log(recover)
            if (recover) {
                return 0
            }
        }
        catch (err) {

            return err

        }

    }

    async updateNewPassword({ userId, secret, password, passwordAgain }) {
        console.log(userId, secret, password);
        try {
            const response = await this.account.updateRecovery(
                userId,
                secret,
                String(password),
                String(passwordAgain)
            );
            console.log(response);
        } catch (error) {
            console.log("updateError", error);
        }
    }

}



const authService = new AuthService()

export default authService
