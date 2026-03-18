import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Component Imports
import { MatchCreateComponent } from "./components/matchcreate/matchcreate.component";
import { MatchEditComponent } from "./components/matchedit/matchedit.component";
import { CricketerCreateComponent } from "./components/cricketercreate/cricketercreate.component";
import { CricketerEditComponent } from "./components/cricketeredit/cricketeredit.component";

const routes: Routes = [
  // Cricketer Routes
  { path: 'add-cricketer', component: CricketerCreateComponent },
  { path: 'edit-cricketer/:id', component: CricketerEditComponent },
  
  // Match Routes
  { path: 'add-match', component: MatchCreateComponent },
  { path: 'edit-match/:id', component: MatchEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IplRoutingModule {}

