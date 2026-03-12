// Importamos el decorador Component de Angular
import { Component } from '@angular/core';

// Importamos FormsModule para poder usar ngModel en el formulario
import { FormsModule } from '@angular/forms';

// Importamos CommonModule para usar directivas como *ngFor
import { CommonModule } from '@angular/common';

// Decorador que define el componente
@Component({
  selector: 'app-productos', // nombre de la etiqueta HTML del componente
  standalone: true, // indica que es un componente independiente
  imports: [CommonModule, FormsModule], // módulos necesarios para que funcione
  templateUrl: './productos.html', // archivo HTML asociado
  styleUrl: './productos.css' // archivo de estilos
})

// Clase principal del componente
export class ProductosComponent {

  // Arreglo donde se almacenan los productos (simula una base de datos)
  productos:any[] = [];

  // Objeto que representa el producto que se está capturando en el formulario
  producto = {
    id: '',
    nombre: '',
    precio: ''
  };

  // Variable que indica si estamos editando un producto
  editando = false;

  // Índice del producto que se está editando
  indiceEditar:number = -1;

  // MÉTODO PRINCIPAL: guardar producto (CREATE y UPDATE)
  guardarProducto(){

if(!this.editando){

this.productos.push({...this.producto});
alert("Producto agregado correctamente");

}else{

this.productos[this.indiceEditar] = {...this.producto};
this.editando = false;
alert("Producto actualizado");

}

this.limpiarFormulario();

}

  // MÉTODO: editar producto (UPDATE)
  editarProducto(index:number){

    // Copiamos los datos del producto seleccionado al formulario
    this.producto = {...this.productos[index]};

    // Guardamos el índice del producto que se editará
    this.indiceEditar = index;

    // Activamos el modo edición
    this.editando = true;

  }

  // MÉTODO: eliminar producto (DELETE)
  eliminarProducto(index:number){

    if(confirm("¿Seguro que quieres eliminar este producto?")){
      this.productos.splice(index,1);
}

}

  // MÉTODO: limpiar formulario
  limpiarFormulario(){

    // Reiniciamos el objeto producto para vaciar los campos
    this.producto = {id:'', nombre:'', precio:''};

  }

}