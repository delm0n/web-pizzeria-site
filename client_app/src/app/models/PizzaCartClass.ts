import { IngredientClass } from './IngredientClass' 

export class PizzaCartClass  {
    PizzaId!: number;
    PizzaName!: string;
    UrlImg!: string;
    Structure!: string;
    Size!: {
    PizzaSizeId: number;
    NameSize: string; //имя размера
    Price: number;
    Mass: number;
    //Pizza: null;
  };
    Ingredients!: IngredientClass[]; 
    Count!: number;
}

export class Size {
  PizzaSizeId!: number; 
  NameSize!: string; //имя размера
  Price!: number ;
  Mass!: number;

}