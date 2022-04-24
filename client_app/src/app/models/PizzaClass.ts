export class PizzaClass {
    PizzaId!: number;
    PizzaName!: string;
    UrlImg!: string;
    Structure!: string;
    MinPrice!: number;
    Rating!: number;
    PizzaType!: TypesPizzaEnum;
}

enum TypesPizzaEnum {
    Usual = 0,
    Spicy = 1,
    Meatless = 2,
}