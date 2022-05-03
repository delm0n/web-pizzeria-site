import { IngredientClass } from './IngredientClass' 

export class PizzaCartClass  {
    PizzaId!: number;
    PizzaName!: string;
    UrlImg!: string;
    Structure!: string;
    Size!: Size;
    PizzaType!: TypesPizzaEnum;
    Ingredients!: IngredientClass[]; 
    Count!: number;
}

export class Size {
  PizzaSizeId!: number; 
  NameSize!: string; //имя размера
  Price!: number ;
  Mass!: number;
}

enum TypesPizzaEnum {
  Usual = 0,
  Spicy = 1,
  Meatless = 2,
}