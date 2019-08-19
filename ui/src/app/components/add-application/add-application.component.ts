import { Component, OnInit } from '@angular/core';
import { APIService } from './../../services/api.service'
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css']
})
export class AddApplicationComponent implements OnInit {

  form: FormGroup;

  constructor(private apiService: APIService, private fb: FormBuilder) {
   }
  // arrayItems: {
  //   id: number;
  //   title: string;
  // }[];
  //applicationName = new FormControl('');

  // environmentName = new FormControl('');

  ngOnInit() {
    this.form = this.fb.group({
      items: this.fb.array([this.createItem()]),
      applicationName: new FormControl('')
    });
  }

  async addApplication(){
    alert("Add Application");

    console.log(this.form.value);
    // //   if (this.validateSecretMatch())
    // //   {
    //     this.apiService.CreateSecretForApplication("foo").subscribe
    //     (
    //       data=> {
    //         console.log(data);
    //       }
    //     );
    // //   }
    // // }
  }

  createItem() {
    return this.fb.group({ environmentName: ['']
    })
  }

  addEnvironment(){
    (this.form.controls['items'] as FormArray).push(this.createItem())
  }

  // addItem(item) {
  //     this.arrayItems.push(item);
  //     this.demoArray.push(this._formBuilder.control(false));
  // }
  // removeItem() {
  //     this.arrayItems.pop();
  //     this.demoArray.removeAt(this.demoArray.length - 1);
  // }
}
