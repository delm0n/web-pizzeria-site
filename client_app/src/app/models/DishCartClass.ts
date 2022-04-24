export class DishesCartClass {
    DishId!: number;
    Name!: string;
    UrlImg!: string;
    Price!: number;
    Mass!: number;
    Count!: number;
    Structure!: string;
    DishType!: TypesEnum;
}

export enum TypesEnum
{
    Drinks = 0,
    Desserts = 1,
    Snacks = 2,
    Salads = 3
}