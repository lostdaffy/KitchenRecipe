import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/UserService/user.service';
import { environment } from 'src/environments/environment';


declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('closebutton') closebutton: any;


  recipeTitle: string = ''
  cookingTutorial: string = ''
  onTime: string = ''
  totalTime: string = ''
  Yield: string = ''
  file: any;
  imgUrl:any=environment.imgUrl
  
  // get data
  recipe: any;

  constructor(private _http: HttpClient, public userService: UserService, private router: Router) {
    this.userService.getAllrecipe().subscribe((data: any) => {
      console.warn(data)
      this.recipe = data.data;
    })
  }

  getTitle(recipeTitle: string) {
    this.recipeTitle = recipeTitle;
    console.log('recipeTitle:', this.recipeTitle)
  }
  getTutorial(cookingTutorial: string) {
    this.cookingTutorial = cookingTutorial;
    console.log('cookingTutorial:', this.cookingTutorial)
  }
  getTime(onTime: string) {
    this.onTime = onTime;
    console.log('onTime:', this.onTime)
  }
  getTotalTime(totalTime: string) {
    this.totalTime = totalTime;
    console.log('totalTime:', this.totalTime)
  }
  getYield(Yield: string) {
    this.Yield = Yield;
    console.log('Yield:', this.Yield)
  }
  getFile(event: any) {
    this.file = event.target.files[0];
    console.log('file', this.file)
  }


  createRecipe() {
    let formData = new FormData();
    formData.set('recipeTitle', this.recipeTitle)
    formData.set('cookingTutorial', this.cookingTutorial)
    formData.set('onTime', this.onTime)
    formData.set('totalTime', this.totalTime)
    formData.set('Yield', this.Yield)
    formData.set('file', this.file)

    this._http.post('http://localhost:3000/uploadRecipe', formData).subscribe((data: any) => {
      if (data.status) {
        // this.router.navigate(['/Admin-Panel'])
        // alert()
        // $('#exampleModal_2').modal('hide')

        this.closebutton.nativeElement.click();
        location.reload();
      }
    }
    )
  }



  ngOnInit(): void {
  }
// Delete Recipe

  deleteRecipe(userData: any) {
    this.userService.deleteRecipe(userData).subscribe((data) => {
      location.reload();
    });
  }


}
