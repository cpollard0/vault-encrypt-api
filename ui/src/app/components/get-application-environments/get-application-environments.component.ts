import { Component, OnInit } from '@angular/core';
import { APIService } from './../../services/api.service'

@Component({
  selector: 'app-get-application-environments',
  templateUrl: './get-application-environments.component.html',
  styleUrls: ['./get-application-environments.component.css']
})
export class GetApplicationEnvironmentsComponent implements OnInit {

  constructor(private apiService: APIService) { }

  environment_list: any;
  ngOnInit() {
    this.GetEnvironmentsForApplication("chris_new_app4");
  }

  async GetEnvironmentsForApplication(application_name)
  {
     this.apiService.GetEnvironmentsForApplication(application_name).subscribe
     (
       data=> {
         console.log(data);
         this.environment_list = data.body;
       }
   );
   }
}
