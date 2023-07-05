import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private api:ApiService){}
  searchTerm:string=""
  cartItemsCount:number=0;

  ngOnInit(): void {
    this.api.getCartItemCount.subscribe((data)=>{
      console.log(data);//length of the cart
      this.cartItemsCount=data;

      
    })
    
  }


  search(event:any){
    console.log(event.target.value);
    this.api.searchTerm.next(event.target.value)
    
  }

}
