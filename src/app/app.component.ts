import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[];
	nuevaTarea:FormGroup;

	constructor(
		public service: AppService,
		public formBuilder:FormBuilder
	) { }
	
	ngOnInit() {
		this.obtenerTareas();
		this.buildForm();
	}

	/**
	 * Método que inicializa el formulario de nueva tarea
	 */
	buildForm() {
		this.nuevaTarea = this.formBuilder.group({
			titulo: ['',[Validators.required]],
			minutos:[0,[Validators.required,Validators.min(0),Validators.pattern('[0-9]+')]] 
		})
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

	/**
	 * Método que agrega la tarea a la lista
	 */
	async crearTarea(){
		if(this.nuevaTarea.valid){
			console.log(this.nuevaTarea.value)
			var values = this.nuevaTarea.value;
			await this.service.crearTarea(values.titulo,Number(values.minutos))
			.then(res=>{
				alert("Tarea agregada con éxito");
			})
			.catch(err=>{
				alert("Ha ocurrido un error al agregar la tarea");
			});
		}else{
			//aviso de error
			alert('La información no fue completada correctamente')
		}
	}

	  /**
	 * Función que hace la validacion de el atributo del formulario según las restricciones
	 * retorna true si hay error
	 * retorna false si no hay error
	 */
	handleError(controlName: string, errorName: string) {
		return this.nuevaTarea.controls[controlName].hasError(errorName);
	}
}
