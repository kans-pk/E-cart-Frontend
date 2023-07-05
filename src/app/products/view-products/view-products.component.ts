import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit{
  productId:string=""
  constructor(private viewRoute:ActivatedRoute,private api:ApiService){}
  //to hold particular product details
  product:any=[];
  ngOnInit(): void {
    
    this.viewRoute.params.subscribe((result:any)=>{
      console.log(result.productId);
      this.productId=result.productId;
      //to Fetch particular product details
      this.api.viewProduct(this.productId).subscribe((result:any)=>{
        console.log(result);
        this.product=result;

        
      },
      (result:any)=>{
        console.log(result.error);
        
      })
      
    })
  }
  //api function for adding product to wishlist
  addToWishlist(){
    const{id,title,price,image}=this.product
    //api function
    this.api.addToWishlist(id,title,price,image).subscribe((result:any)=>{
      alert(result)
    },
    (result:any)=>{
      alert(result.error);
    })
  }

  addToCart(product:any){
    
    //add quatity
    Object.assign(product,{quantity:1})
    console.log(product);

    //api call to add quatity
    this.api.addToCart(product).subscribe((result:any)=>{
      //call cart count
      this.api.cartCount();
      alert(result)
      
    },
    (result:any)=>{
      alert(result.error)
    })
    
  }



}
