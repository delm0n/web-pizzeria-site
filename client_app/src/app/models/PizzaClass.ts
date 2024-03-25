export class PizzaClass {
    PizzaId!: number;
    PizzaName!: string;
    UrlImg!: string;
    Structure!: string;
    MinPrice!: number;
    Rating!: number;
    //countRate!: number;
    PizzaType!: TypesPizzaEnum;
    CountOrder!: number
    IdClientRateJson? : string;
    ClientRateJson? : string;
}

enum TypesPizzaEnum {
    Usual = 0,
    Spicy = 1,
    Meatless = 2,
}