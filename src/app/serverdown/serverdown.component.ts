import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-serverdown',
  templateUrl: './serverdown.component.html',
  styleUrls: ['./serverdown.component.css']
})
export class ServerdownComponent implements OnInit {

  
  resultloader: boolean = false;
  serverDown = false;

  constructor(private http: HttpClient, private service: LoginService, private router: Router,private location:Location) {
    this.checkServerStatus();
  }


  ngOnInit(): void {
    setInterval(() => {
      this.checkServerStatus();
    }, 1000);
  }

  async checkServerStatus() {
    let email = sessionStorage.getItem("email");
    let password = sessionStorage.getItem("loginPassword");

    let httpParams = new HttpParams().append("emailId", email).append("loginPassword", password);
    try 
    {
      const res = await this.service.GetUserData(httpParams).toPromise();
      if (res.Status == 1) {
        this.goback();
      }
    }
    catch (err) 
    {
      console.log(err);
      
    }

  }
  goback()
  {
    this.location.back();
  }
}