import { NgModule } from '@angular/core';
import { ListarComponent } from './pages/tarefa/listar/listar.component';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './pages/tarefa/cadastrar/cadastrar.component';

const routes: Routes = [
  {
  path : "",
  component:  ListarComponent
},
{
  path : "pages/tarefa/listar",
  component: ListarComponent
},
{
  path : "pages/tarefa/cadastrar",
  component: CadastrarComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
