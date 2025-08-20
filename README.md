PROYECTO 1 - ARBOL B

Este proyecto implementa un Arbol B en TypeScript para almacenar y gestionar informacion de proveedores 

Un arbol B es una estructura de datos que mantiene los elementos ordenaedos y permite 
operaciones como búsqueda, inserciónes y recorrido en tiempo logarítmico
se uriliza mucho en bases de datos y sistemas de archivos porque ayuida a manejar grandes cantidades
de datos.


EN ESTE ARBOL PERMITE
*Insertar proveedores en orden
*Buscar proveedores por servicio
*Listar proveedortes por calificacion de mayor a menor

en este caso, cada proveedor tiee los siguientes atributos
id: identificador unico
nombre: nombre del proveedor 
servicio: tipo de servicio que ofrece
calificaciom: puntuacion de 1 a 5 estrellas 



/////////////// PARTES IMPORTANTES ///////////////////

en esta parte definiomos que datos tiene cada proveedor dentro del sistema

    interface Proveedor {
    id: number;
    nombre: string;
    servicio: string;
    calificacion: number;
}

este metodo permite recorrer el arbol de izquierda a derecha devolviendo la lista de proveedores ordenados por su ID

    recorrer(): Proveedor[] {
        let resultado: Proveedor[] = [];
        let i: number;
        for (i = 0; i < this.proveedores.length; i++) {
            if (!this.esHoja) {
                resultado.push(...this.hijos[i].recorrer());
            }
            resultado.push(this.proveedores[i]);
        }
        if (!this.esHoja) {
            resultado.push(...this.hijos[i].recorrer());
        }
        return resultado;
    }

Con este metodo podemos buscar proveedores que tengan un servicio especifico

    buscarPorServicio(servicio: string): Proveedor[] {
        let resultados: Proveedor[] = [];
        for (let prov of this.proveedores) {
            if (prov.servicio.toLowerCase() === servicio.toLowerCase()) {
                resultados.push(prov);
            }
        }
        if (!this.esHoja) {
            for (let hijo of this.hijos) {
                resultados.push(...hijo.buscarPorServicio(servicio));
            }
        }
        return resultados;
    }


este seria el corazon del arbol B, que inserta nuevos proveedores y divide los nodos cuando se llenan 
esto garantiza que el arbol nunca pierda sui estructura balanceada 

    insertarNoLleno(proveedor: Proveedor) {
        let i = this.proveedores.length - 1;
        if (this.esHoja) {
            while (i >= 0 && proveedor.id < this.proveedores[i].id) {
                i--;
            }
            this.proveedores.splice(i + 1, 0, proveedor);
        } else {
            while (i >= 0 && proveedor.id < this.proveedores[i].id) {
                i--;
            }
            if (this.hijos[i + 1].proveedores.length === (2 * this.t - 1)) {
                this.dividirHijo(i + 1, this.hijos[i + 1]);
                if (proveedor.id > this.proveedores[i + 1].id) {
                    i++;
                }
            }
            this.hijos[i + 1].insertarNoLleno(proveedor);
        }
    }


//Proyecto 1 - Estructura de Datos 1
//Miguel Macario
//Jason Gutierrez
//Abel de Leon
