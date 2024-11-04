import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ocassion-reminder-app';
  loadedFeature='occassion-list';

  constructor(private authService: AuthService){

  }

  onNavigate(feature: string){
    console.log(feature)
    this.loadedFeature = feature;
  }
  ngOnInit(): void {
     /// this.authService.autoLogin();
  }
}
