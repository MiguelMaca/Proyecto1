//Proyecto 1 - Estructura de Datos 1
//Miguel Macario
//Jason Gutierrez
//Abel de Leon

interface Proveedor {
    id: number;
    nombre: string;
    servicio: string;
    calificacion: number;
}

class BTreeNode {
    t: number; 
    proveedores: Proveedor[] = [];
    hijos: BTreeNode[] = [];
    esHoja: boolean;

    constructor(t: number, esHoja: boolean) {
        this.t = t;
        this.esHoja = esHoja;
    }

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

    dividirHijo(i: number, y: BTreeNode) {
        const z = new BTreeNode(y.t, y.esHoja);

        // Guardar el valor medio antes de cortar
        const valorMedio = y.proveedores[this.t - 1];

        // Pasar las claves a z
        for (let j = 0; j < this.t - 1; j++) {
            z.proveedores.push(y.proveedores[j + this.t]);
        }

        // Pasar hijos si no es hoja
        if (!y.esHoja) {
            for (let j = 0; j < this.t; j++) {
                z.hijos.push(y.hijos[j + this.t]);
            }
        }

        // Reducir y a t-1 claves
        y.proveedores.length = this.t - 1;
        if (!y.esHoja) {
            y.hijos.length = this.t;
        }

        // Insertar z como nuevo hijo
        this.hijos.splice(i + 1, 0, z);
        // Insertar el valor medio en el nodo actual
        this.proveedores.splice(i, 0, valorMedio);
    }
}
class BTree {
    raiz: BTreeNode | null = null;
    t: number;

    constructor(t: number) {
        this.t = t;
    }

    insertar(proveedor: Proveedor) {
        if (!this.raiz) {
            this.raiz = new BTreeNode(this.t, true);
            this.raiz.proveedores.push(proveedor);
        } else {
            if (this.raiz.proveedores.length === (2 * this.t - 1)) {
                const nuevaRaiz = new BTreeNode(this.t, false);
                nuevaRaiz.hijos.push(this.raiz);
                nuevaRaiz.dividirHijo(0, this.raiz);
                let i = 0;
                if (nuevaRaiz.proveedores[0].id < proveedor.id) {
                    i++;
                }
                nuevaRaiz.hijos[i].insertarNoLleno(proveedor);
                this.raiz = nuevaRaiz;
            } else {
                this.raiz.insertarNoLleno(proveedor);
            }
        }
    }

    recorrer(): Proveedor[] {
        return this.raiz ? this.raiz.recorrer() : [];
    }

    buscarPorServicio(servicio: string): Proveedor[] {
        return this.raiz ? this.raiz.buscarPorServicio(servicio) : [];
    }
}



