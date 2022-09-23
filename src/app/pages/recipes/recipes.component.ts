import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserService/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipe: any;
  imgUrl:any=environment.imgUrl

  ngOnInit(): void {
  }

  constructor(private _http: HttpClient, public userService: UserService, private router: Router) {
    this.userService.getAllrecipe().subscribe((data: any) => {
      this.recipe = data.data;
    })
  }


}
