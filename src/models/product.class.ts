export class Product{
    product: string;
    price: number;
    dateOfPurchase:number;

    constructor(obj?: any){
        this.product = obj ? obj.product : "";
        this.price = obj ? obj.price : "";
        this.dateOfPurchase = obj? obj.dateOfPurchase : "";
    }

    public toJson(){
        return {
            product: this.product,
            price: Number(this.price).toLocaleString('de',{style: 'currency', currency:'EUR', minimumFractionDigits:2}),
            dateOfPurchase: this.dateOfPurchase
    }
}

}