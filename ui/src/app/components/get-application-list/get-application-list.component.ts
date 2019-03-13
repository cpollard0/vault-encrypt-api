import { Component, OnInit } from '@angular/core';
import { APIService } from './../../services/api.service'

@Component({
  selector: 'app-get-application-list',
  templateUrl: './get-application-list.component.html',
  styleUrls: ['./get-application-list.component.css']
})
export class GetApplicationListComponent implements OnInit {

  application_list: any;
  constructor(private apiService: APIService) { }

  ngOnInit() {
    this.getApplicationList();
  }

  async getApplicationList(){
    const api_results = this.apiService.GetApplicationList().subscribe
    (
      data=> {
        console.log(data);
        this.application_list = data.body;
      }
    );
  }

 async GetEnvironmentsForApplication(application_name)
 {
    this.apiService.GetEnvironmentsForApplication("chris_new_app4").subscribe
    (
      data=> {
        console.log(data);
        this.application_list = data.body;
      }
  );
  }
}
