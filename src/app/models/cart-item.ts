import { Product } from "./product.model";

export class CartItem {
    public id: string = (Math.random() * 10000).toString();
    public price: number = this.product.price * this.quantity;
    public image: string = this.product.images[0];

    constructor(
        public product: Product,
        public quantity: number,
    ) {

    }
}
