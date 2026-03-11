import { Component } from '@angular/core';
// Importamos los módulos necesarios para trabajar con formularios reactivos
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
// Importamos CommonModule para usar directivas comunes como *ngFor y *ngIf
import { CommonModule } from '@angular/common';
//import { TablaCompras } from './tabla-compras/tabla-compras';
import { ListaService } from './tabla-compras/lista_server';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    RouterModule], // Importante para que funcione el form
  styleUrl: './app.css'
})

export class App {

miFormulario: FormGroup;

  constructor(private fb: FormBuilder, 
    private listaService: ListaService,
    public router: Router) {
    // Definimos el formulario con un array vacío de "items"
    this.miFormulario = this.fb.group({
      nombreLista: ['', Validators.required],
      items: this.fb.array([]) 
    });

  }

  // Getter para acceder al array de forma fácil en el HTML
  get listaItems() {
    return this.miFormulario.get('items') as FormArray;
  }

  // MÉTODO: AGREGAR (Crear)
  agregarItem() {
    const nuevoGrupo = this.fb.group({
      producto: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });

    this.listaItems.push(nuevoGrupo);
  }

  // MÉTODO: BORRAR
  eliminarItem(indice: number) {
    this.listaItems.removeAt(indice);
    console.log('Valores del formulario:', this.listaItems.value);
  }

  enviarDatos() {
    console.log('Valores del formulario:', this.miFormulario.value);
  }
  verEnOtraPagina() {
  // Guardamos los datos actuales en el servicio antes de irnos
  this.listaService.actualizarLista(this.listaItems.value);
  // Navegamos a la ruta de la tabla
  this.router.navigate(['/lista']);
}
}
 