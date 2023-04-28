import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './services/login.service';

import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  private loadHeader=new BehaviorSubject(false);
  loadMessage=this.loadHeader.asObservable();

  private loadHeaderContent=new BehaviorSubject(false);
  HeaderContent=this.loadHeaderContent.asObservable();

  constructor(private router: Router,private service: LoginService,private location:Location) { }
  
  loadComponent(message:any){
    this.loadHeader.next(message);
  }
  
  headerContent(content:any){
     this.loadHeaderContent.next(content);
    }

    async checkServerStatus() {
      let email = sessionStorage.getItem("email");
      let password = sessionStorage.getItem("loginPassword");
  
      let httpParams = new HttpParams().append("emailId", email).append("loginPassword", password);
      try 
      {
        const res = await this.service.GetUserData(httpParams).toPromise();
        
      }
      catch (err) 
      {
        console.log(err);
        this.router.navigate(["/server-down"]);
      }
  
    }
}
