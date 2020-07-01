import { Injectable } from '@angular/core';
import { Tarea } from './tarea';

@Injectable()
export class AppService { 
    tareas: Tarea[] = [];
    constructor() { 
        this.llenarTareas();
    }

    public async obtenerTareas() {
        return this.tareas;
    }

    /**
     * Método para llenar tareas
     */
    llenarTareas(){
        try {
            this.tareas.push(new Tarea(1, 'Sacar a pasear al perro', 15));
            this.tareas.push(new Tarea(2, 'Sacar la basura', 5));
            this.tareas.push(new Tarea(3, 'Cocinar la cena', 30));
            this.tareas.push(new Tarea(4, 'Lavar la ropa', 50));
            this.tareas.push(new Tarea(5, 'Regar las plantas', 20));
            return this.tareas;
        } catch (error) {
            return null;
        }
    }

    /**
     * Método para agregar tarea a la lista
     * @param titulo de la tarea
     * @param minutos de la tarea
     */
    public async crearTarea(titulo:string,minutos:number){
        try{
            this.tareas.push(new Tarea(this.tareas.length,titulo,minutos));
        }catch(error){
            console.log("Error al agregar la tarea");
        }
    }

    /**
     * Metodo para eliminar tarea
     * @param id de tarea
     */
    public async eliminarTarea(id:number){
        var i = this.tareas.findIndex(value=>value.id == id);
        if (i!== -1) {
            this.tareas.splice(i,1);
        }
    }

    /**
	 * Metodo para ordenar por minutos de mayor a menor
	 */
	async ordenarMayorMenor(){
		this.tareas.sort((ele1,ele2)=>ele1.minutos - ele2.minutos);
	}

	/**
	 * Metodo para ordenar por minutos de menor a mayor
	 */
	async ordenarMenorMayor(){
        this.tareas.sort((ele1,ele2)=>ele2.minutos - ele1.minutos);
	}
}