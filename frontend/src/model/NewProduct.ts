export class NewProduct {
    constructor(
        public name: string,
        public categoryId?: number,
        public collectionId?: number,
        public description?: string,
        public price?: number,
        public quantity?: number,
    ) {}
}
