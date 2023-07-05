import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //to hold cart Count
  getCartItemCount=new BehaviorSubject(0);
  searchTerm=new BehaviorSubject('')
  //backend url or path
  BASE_URL='http://localhost:5000'

  constructor(private http:HttpClient) { 
    this.cartCount();
  }
  //get all products
  getAllProducts(){
    return this.http.get(`${this.BASE_URL}/products/all-products`)
  }

  //view particular product details
  viewProduct(id:any){
    return this.http.get(`${this.BASE_URL}/products/viewproducts/${id}`)

  }

  //get wishlist product
  addToWishlist(id:any,title:string,price:any,image:string){
    const body={
      id,
      title,
      price,
      image
    }
    return this.http.post(`${this.BASE_URL}/products/addtowishlist`,body)
  }

  //to view wishlist products
  getWishlist(){
    return this.http.get(`${this.BASE_URL}/products/getWishlist`)
  }

  deleteWishlist(id:any){
    return this.http.delete(`${this.BASE_URL}/products/deletewishlist/${id}`)
    }

    //add to cart
    addToCart(product:any){
      const body={
        id:product.id,
        title:product.title,
        price:product.price,
        image:product.image,
        quantity:product.quantity

      }
      return this.http.post(`${this.BASE_URL}/products/addtocart`,body)
    }

    //get carts
    getCart(){
      return this.http.get(`${this.BASE_URL}/products/getcart`)
    }

    //cart count
    cartCount(){
      this.getCart().subscribe((result:any)=>{
        this.getCartItemCount.next(result.length);
      })
    }

    //delete cart item
    removeCartItem(id:any){
      return this.http.delete(`${this.BASE_URL}/products/deleteFromCart/${id}`)
    }
    //increment cart
    incrementCart(id:any){
      return this.http.get(`${this.BASE_URL}/products/increment/${id}`)
    }

        //decrement cart
        decrementCart(id:any){
          return this.http.get(`${this.BASE_URL}/products/decrement/${id}`)
        }
}
