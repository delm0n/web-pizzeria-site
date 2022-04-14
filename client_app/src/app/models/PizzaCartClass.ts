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

    // constructor() {
    //   this.PizzaId = 0;
    //   this.PizzaName = "";
    //   this.UrlImg ="";
    //   this.Structure = "";
    //   this.Size = new Sizes();
    //   this.Ingredients = []
    //   this.Count = 0;
    // }

}

class Sizes {
  PizzaSizeId!: number; 
  NameSize!: string; //имя размера
  Price!: number ;
  Mass!: number;

  constructor() {
    this.PizzaSizeId= 0; 
    this.NameSize= ""; //имя размера
    this.Price= 0 ;
    this.Mass= 0;
  }
  
}