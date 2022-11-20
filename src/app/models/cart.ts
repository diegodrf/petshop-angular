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

    public getAllItems(): CartItem[] {
        return this.items;
    }
}
