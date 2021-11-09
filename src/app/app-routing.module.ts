import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";

const routs:Routes=[

  {path:':coords',component:AppComponent},
]
@NgModule ({
  imports:[RouterModule.forRoot(routs)],
  exports:[RouterModule]

})
export class AppRoutingModule {

}
