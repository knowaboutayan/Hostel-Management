
 class Transction {
    constructor(userId, name, date, transactionType, transactionAmount, trnasactionDetails) {
        this.userId = userId,
            this.name = name,
            this.date = date,
            this.transactionDetails = trnasactionDetails,
            this.transactionAmount = transactionAmount,
            this.transactionType = transactionType
    }
} 
export default Transction