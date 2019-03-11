import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  MatMenuModule,
  MatTableModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatTabsModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatGridListModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatTooltipModule
} from '@angular/material';


const ModuleImports: any = [
  CommonModule,
  RouterModule,

  // Material module component imports
  MatMenuModule,
  MatSortModule,
  MatTableModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatTooltipModule,
];

@NgModule({
  imports: ModuleImports,
  providers: [
    CurrencyPipe,
    DatePipe
  ],
  declarations: [
  ],
  exports: [,
    ...ModuleImports
  ]
})
export class SharedModule {}