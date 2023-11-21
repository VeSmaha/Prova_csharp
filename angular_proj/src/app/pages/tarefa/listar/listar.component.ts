import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarefa } from './../../../models/Tarefa.model';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {
  Tarefas : Tarefa[]=[];
  constructor(private client: HttpClient){
    
  }
  
  ngOnInit(): void{
    console.log('O componente foi carregado');

    
    this.client.get<Tarefa[]>("https://localhost:7015/api/tarefa/listar").subscribe({
      //quando der certo a requisiçao
      next: (Tarefas)=>{
        this.Tarefas = Tarefas;
        console.table(Tarefas);

      },//caso de erro 
      error:(erro)=>{console.log("Erro: "+ erro)}
    })
  }

  
}
