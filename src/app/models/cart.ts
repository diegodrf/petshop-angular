import { CartItem } from "./cart-item";

export class Cart {
    private items: CartItem[]

    constructor() {
        this.items = [];
    }

    public addItem(item: CartItem): void {
        this.items.push(item);
    }

    public getItem(id: string): CartItem | null {
        let item = this.items.filter(x => x.id == id);
        if (item == null || item.length == 0) {
            return null;
        }
        return item[0];
    }

    public getAllItems(): Array<CartItem> {
        return this.items;
    }

    public totalPrice(): number {
        let total = 0;
        this.items.map(x => total += x.price);
        return total;
    }

    public removeItem(item: CartItem): void {
        let index = this.items.indexOf(item);
        if (index) {
            this.items.splice(index, 1);
        }
    }
}
