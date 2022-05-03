import { DishesCartClass } from 'src/app/models/DishCartClass';
import { DishesClass, TypesEnum } from 'src/app/models/DishClass';
import { ClientService } from 'src/app/myservices/account/client.service';
import { CartService } from 'src/app/myservices/cart/cart.service';
import { DishesService } from 'src/app/myservices/dishes/dishes.service';

export class DishFunctionClass {

    constructor(private clientService: ClientService, private cartService: CartService,
        private dishesService: DishesService) {
        this.getIdDishInCart();
    }

    dish_: DishesClass[] = [];
    dishes_InCartID: number[] = [];

    dish_modal: DishesClass = {
        DishId: 0,
        Name: '',
        UrlImg: '',
        Price: 0,
        Mass: 0,
        Structure: '',
        DishType: TypesEnum.Snacks
    }

    countModal = 1 //количество выбранных пицц
    modal: boolean = true; //флаг на модальное окно
    modalBtn(id: number) {
        this.modal = !this.modal;

        //махинации с прокруткой
        document.body.style.overflow = 'hidden';


        this.dish_modal = this.dish_.find(d => d.DishId == id)!
    }

    modalBtn_close() {
        this.modal = !this.modal;
        document.body.style.overflow = 'visible';
        this.countModal = 1;

        this.dish_modal = {
            DishId: 0,
            Name: '',
            UrlImg: '',
            Price: 0,
            Mass: 0,
            Structure: '',
            DishType: TypesEnum.Snacks
        }

    }

    decrement() {
        if (this.countModal > 1) {
            this.countModal--;
        }
    }

    increment() {
        if (this.countModal < 11) {
            this.countModal++;
        }
    }

    getIdDishInCart() {
        for (let i = 0; i < this.dishesService.dishesCart.length; i++) {
            this.dishes_InCartID.push(this.dishesService.dishesCart[i].DishId);
        }
    }

    addToCart(id: number) {

        //при первом добавлении
        if (this.dishesService.dishesCart.find(d => d.DishId == id) == undefined) {
            let dish: DishesCartClass = {
                DishId: id,
                Name: this.dish_modal.Name,
                UrlImg: this.dish_modal.UrlImg,
                Price: this.dish_modal.Price,
                Mass: this.dish_modal.Mass,
                DishType: this.dish_modal.DishType,
                Structure: this.dish_modal.Structure,
                Count: this.countModal
            }

            this.dishesService.dishesCart.push(dish);
            this.getIdDishInCart();

        }
        else { //иначе просто увеличиваем количество
            this.dishesService.dishesCart.find(d => d.DishId == id)!.Count++;

            if (this.clientService.autorizationFlug) {
                this.dishesService.plusCounterDishInCartServer(this.clientService.client.clientId, id)
            }
        }


        //при входе в аккаунт
        if (this.clientService.autorizationFlug) {
            this.dishesService.addDishInCartServer(this.clientService.client.clientId)
        }

        this.modalBtn_close();
    }
}