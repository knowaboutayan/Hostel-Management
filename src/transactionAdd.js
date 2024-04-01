
 class Transction {
    constructor(userId, name, date, transactionType, transactionAmount, trnasactionDetails) {
        this.userId = userId,
            this.name = name,
            this.date = date,
            this.details = trnasactionDetails,
            this.amount = transactionAmount,
            this.type = transactionType
    }
} 


export default Transction