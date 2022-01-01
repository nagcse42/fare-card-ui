export class CardDetails {
    id: number;
    cardNumber: string;
    balance: string;

    constructor(id, cardNumber, balance) {
        this.id = id;
        this.cardNumber = cardNumber;
        this.balance = balance;
    }
}
