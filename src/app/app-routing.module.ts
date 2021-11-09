import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";

const routs:Routes=[

  {path:':koords',component:AppComponent},
]
@NgModule ({
  imports:[RouterModule.forRoot(routs)],
  exports:[RouterModule]

})
export class AppRoutingModule {

}
