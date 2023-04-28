import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  Username: string = "";
  title = 'Bytes';
  activeTab: string = 'SO Details';
  selectedTeam: string;
  Name:any;
  statuses:any;
  z: any;
  technologies: any;
  regions: any;
  selectperiod: string;
  location: any;

  constructor(private service: DashboardService,private loginservice: LoginService,private router: Router,
    private commonservice:CommonService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.commonservice.checkServerStatus();
    }, 1000);
    this.selectedTeam = "Weekly";
    this.selectperiod="Weekly"
    this.Username = this.getUserName();
    this.getSODashboardData();
    this.activeTab = 'SO';
  } 

  getSODashboardData() {

    this.service.GetSODashboardData(this.selectedTeam).subscribe(result => 
      {

     this.statuses= result.filter(x=>x.category=='Status');
     this.technologies=result.filter(x=>x.category=='Technology');
     this.regions=result.filter(x=>x.category=='Region');
    })
  }

  getCandidateDashboardData(){
    this.service.GetCandidateDashboardData(this.selectperiod).subscribe(result=>{
      this.location=result.filter(x=>x.category=='Location');
    })
  }

  onSelected(value: string): void {
    this.selectedTeam = value;
    this.getSODashboardData();
  } 
  
  getUserName(): any {
    let data = sessionStorage.getItem('userData');
    let userInfo = (data) ? JSON.parse(data) : null;
    return userInfo.LoginName;
  }

  onTabClick(tab) {
    this.activeTab = tab;
  }

  onSelectionChange(value:string){
    this.selectperiod=value
    this.getCandidateDashboardData();
  }

  


}
