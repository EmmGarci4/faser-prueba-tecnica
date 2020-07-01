import { Injectable } from '@angular/core';
import { Tarea } from './tarea';
import { element } from 'protractor';

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
            this.tareas.push(new Tarea(1, 'Sacar a pasear al perro', 15,false));
            this.tareas.push(new Tarea(2, 'Sacar la basura', 5,false));
            this.tareas.push(new Tarea(3, 'Cocinar la cena', 30,false));
            this.tareas.push(new Tarea(4, 'Lavar la ropa', 50,false));
            this.tareas.push(new Tarea(5, 'Regar las plantas', 20,false));
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
            this.tareas.push(new Tarea(this.tareas.length,titulo,minutos,false));
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
    

    /**
     * Metodo que cambia el estado de la tarea
     * @param id de tarea
     * @param esDestacada estado
     */
	marcarTarea(id:number,esDestacada:boolean){
        var tarea = this.tareas.find(element=>element.id === id);
        console.log(tarea)
        if(tarea!=null){
            tarea.esDestacada = esDestacada;
        }
	}
    
}