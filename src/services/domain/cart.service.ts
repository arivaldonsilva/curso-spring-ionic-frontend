import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService{

    constructor(
        public storage: StorageService,
        public http: HttpClient){}

    createOrClearCart(): Cart{
        let cart: Cart = 
        {
            items: []
        };
        this.storage.setCart(cart);
        return cart;
    }

    getCart(): Cart{
        let cart: Cart = this.storage.getCart();
        if(cart == null){
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO):Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position == -1){
            cart.items.push({quantidade: 1, produto: produto });
        }
        else{
            cart.items[position].quantidade += 1;
        }
        this.storage.setCart(cart);
        return cart;
    }

    // remove um produto do carrinho
    removeProduto(produto: ProdutoDTO): Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items.splice(position, 1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    // aumenta em uma unidade a quantidade de item do carrinho
    increaseQuantity(produto: ProdutoDTO):Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items[position].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    // reduz em uma unidade a quantidade de item do carrinho
    decreaseQuantity(produto: ProdutoDTO):Cart{
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if(position != -1){
            cart.items[position].quantidade--;
            if(cart.items[position].quantidade < 1){
                cart = this.removeProduto(produto);
            }
        }
        this.storage.setCart(cart);
        return cart;
    }

    total(): number{
        let cart = this.storage.getCart();
        let sum = 0;
        for(var i=0; i < cart.items.length; i++){
            sum += cart.items[i].quantidade * cart.items[i].produto.preco;
        }
        return sum;
    }
}