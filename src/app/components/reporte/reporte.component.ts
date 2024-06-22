import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { UserService } from '../../services/user.service';
import { Gasto } from '../../models/gasto';
import { Usuario } from '../../models/usuario.model';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent implements OnInit{
  gastos:Gasto[]=[];
  usuarios:Usuario[]=[];
  constructor(private gastoService:GastoService, private usersService:UserService) {
  this.gastoService.obtenerDatos().subscribe(data =>
  {
  console.log(data);
  this.gastos=data;
  });
  this.usersService.obtenerDatos().subscribe(data =>
    {
    console.log(data);
    this.usuarios=data;
    });
  }
 

  ngOnInit(): void {
    
  }
}
