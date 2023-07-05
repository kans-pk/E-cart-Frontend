import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  constructor(private api:ApiService){}
  wishlistProducts:any=[]
  ngOnInit(): void {
    this.api.getWishlist().subscribe((result:any)=>{
      console.log(result);
      this.wishlistProducts=result;
      
    },
    (result:any)=>{
      console.log(result.error);
      
    })
    
    
    
  }
  deleteWishlist(id:any){
      //delete api call
      this.api.deleteWishlist(id).subscribe((result)=>{
        this.wishlistProducts=result
        // alert('Product Deleted Successfully')

      },
      (result:any)=>{
        alert(result.error)
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
        this.deleteWishlist(product.id)
        alert(result)
        
      },
      (result:any)=>{
        alert(result.error)
      })
      
    }



}
