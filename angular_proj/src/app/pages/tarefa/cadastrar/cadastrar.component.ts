import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/Categoria.model';
import { Tarefa } from 'src/app/models/Tarefa.model';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {
  
  titulo! : string;

  descricao! : string;

  categoriaId! : number;

  categorias!: Categoria[];

  constructor(private client:HttpClient, private router: Router){

  }

  ngOnInit(): void {
    this.client
      .get<Categoria[]>("https://localhost:7015/api/categoria/listar")
      .subscribe({
        //A requição funcionou
        next: (categorias) => {
          console.table(categorias);
          this.categorias = categorias;
        },
        //A requição não funcionou
        error: (erro) => {
          console.log(erro);
          
        },
      });
  }

  cadastrar(): void{
    let tarefa : Tarefa = {
      titulo : this.titulo,
      descricao : this.descricao,
      status: "Não iniciada",
      categoriaId: this.categoriaId
    };
    console.log("Dados Enviados:", tarefa);

  const headers = { 'Content-Type': 'application/json' };
    this.client.post<Tarefa>("https://localhost:7015/api/tarefa/cadastrar", tarefa).subscribe({
      //requisisao com sucesso cai aqui no next
      next: (Tarefa)=>{
        console.table(Tarefa);
        this.router.navigate(["/pages/tarefa/listar"]);

      },//caso de erro 
      error:(erro)=>{console.log("Erro: "+ erro)}

    })
  }
}
