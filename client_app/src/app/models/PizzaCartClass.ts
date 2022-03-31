import { IngredientClass } from './IngredientClass' 

export class PizzaCartClass {
    pizzaId!: number;
    pizzaName!: string;
    urlImg!: string;
    structure!: string;
    sizes!: {
      pizzaSizeId: number;
      nameSize : string; //имя размера
      price: number;
      mass: number
    };
    ingredients!: IngredientClass[]; 
    count!: number;
}