import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { InformacionComponent } from './components/informacion/informacion/informacion.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { FormsModule } from '@angular/forms';
import { ImpuestosComponent } from './components/impuestos/impuestos.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GastoService } from './services/gasto.service';
import { DataService} from './services/data.service';
import { JsonFileService } from './services/json-file.service';



const rutas: Routes = [
  { path: 'info', component: InformacionComponent },
  { path: 'formulario', component: FormularioComponent },
  { path: 'impuestos', component: ImpuestosComponent },  
  { path: 'reporte', component: ReporteComponent },
  ];
  

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InformacionComponent,
    ReporteComponent,
    FormularioComponent,
    ImpuestosComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [
    provideClientHydration(),
    GastoService, 
    DataService,
    JsonFileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
