import * as asciichart from 'asciichart';
import * as fs from 'fs';

class Consultorio {
    private listaPacientes: Paciente[];
    private curvaOMSPesoNiño: number[];
    private curvaOMSPesoNiña: number[];
    private curvaOMSAlturaNiño: number[];
    private curvaOMSAlturaNiña: number[];

    public constructor (curvaOMSPesoNiño: number[], curvaOMSPesoNiña: number[], curvaOMSAlturaNiño: number[], curvaOMSAlturaNiña: number[]) {
        this.curvaOMSPesoNiño = curvaOMSPesoNiño;
        this.curvaOMSPesoNiña = curvaOMSPesoNiña;
        this.curvaOMSAlturaNiño = curvaOMSAlturaNiño;
        this.curvaOMSAlturaNiña = curvaOMSAlturaNiña;
        this.listaPacientes = [];
    }

    public agregarPaciente (paciente: Paciente): void {
        this.listaPacientes.push(paciente);
    }

    public agregarVisita (dni:number, visita: Visita): void {
        for (let i:number=0; i<this.listaPacientes.length; i++) {
            if(dni== this.listaPacientes[i].getDni()) {
                this.listaPacientes[i].agregarVisita(visita);
            }
        }
    }

    public getPacientePesoMes(dni: number, mes: number): number {
        for (let i:number=0; i<this.listaPacientes.length; i++) {
            if(dni== this.listaPacientes[i].getDni()) {
                let pesoMes: number = this.listaPacientes[i].getPesoMes(mes);
                return pesoMes;
            }
        }
        return -1;
    }

    public getPacienteAlturaMes(dni: number, mes: number): number {
        for (let i:number=0; i<this.listaPacientes.length; i++) {
            if(dni== this.listaPacientes[i].getDni()) {
                let alturaMes: number = this.listaPacientes[i].getAlturaMes(mes);
                return alturaMes;
            }
        }
        return -1;
    }

    public graficarCurvasPeso(dni: number): void {
        for (let i: number=0; i<this.listaPacientes.length; i++) {
            if (dni== this.listaPacientes[i].getDni()) {
                let arrayPesos: number[] = this.listaPacientes[i].getPeso();
                let config = {
                    colors: [
                        asciichart.blue,
                        asciichart.red,
                        asciichart.default
                    ]
                }
                console.log(asciichart.plot([this.curvaOMSPesoNiño, this.curvaOMSPesoNiña, arrayPesos], config));
            }
        }
    }

    public graficarCurvasAltura(dni: number): void {
        for (let i: number=0; i<this.listaPacientes.length; i++) {
            if (dni== this.listaPacientes[i].getDni()) {
                let arrayAlturas: number[] = this.listaPacientes[i].getAltura();
                let config = {
                    colors: [
                        asciichart.blue,
                        asciichart.red,
                        asciichart.default
                    ]
                }
                console.log(asciichart.plot([this.curvaOMSAlturaNiño, this.curvaOMSAlturaNiña, arrayAlturas], config));
            }
        }
    }
}

class Paciente {
    private nombre: string;
    private dni: number;
    private visitas: Visita[];

    public constructor (nombre: string, dni: number, visitas: Visita[]) {
        this.nombre = nombre;
        this.dni = dni;
        this.visitas = visitas;
    }

    public agregarVisita(visita: Visita): void {
        this.visitas.push(visita);
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getDni(): number {
        return this.dni;
    }

    public setDni(dni: number): void {
        this.dni = dni;
    }

    public getPeso(): number[] {
        let arrayPesos: number[] = [];
        for (let i:number=0; i<this.visitas.length; i++) {
            arrayPesos.push(this.visitas[i].getPeso());
        }
        return arrayPesos; 
    }

    public getPesoMes(i:number): number {
        return this.visitas[i].getPeso();
    }
   
    public getAltura(): number[] {
        let arrayAlturas: number[] = [];
        for (let i:number=0; i<this.visitas.length; i++) {
            arrayAlturas.push(this.visitas[i].getAltura());
        }
        return arrayAlturas; 
    }

    public getAlturaMes(i:number): number {
        return this.visitas[i].getAltura();
    }
}

class Visita {
    private peso: number;
    private altura: number;
    private edadBebe: number;

    public constructor (peso: number, altura: number, edadBebe: number) {
        this.peso = peso;
        this.altura = altura;
        this.edadBebe = edadBebe;
    }

    public getPeso(): number {
        return this.peso;
    }

    public getAltura(): number {
        return this.altura;
    }

    public getedadBebe(): number {
        return this.edadBebe;
    }
}


function lectorArchivos(archivo: string): number[] {
    let valores: string = fs.readFileSync(archivo, "utf-8");
    let arrayValores: string[] = valores.split(",");
    let arrayNumeros: number[]=[];
    for (let i:number=0; i<arrayValores.length; i++) {
        arrayNumeros.push(parseFloat(arrayValores[i]));
    }
    return arrayNumeros;
}

let oMSPesoNiño: number[] = lectorArchivos("curvaOMSPesoNiño.txt");
let oMSPesoNiña: number[] = lectorArchivos("curvaOMSPesoNiña.txt");
let oMSAlturaNiño: number[] = lectorArchivos("curvaOMSAlturaNiño.txt");
let oMSAlturaNiña: number[] = lectorArchivos("curvaOMSAlturaNiña.txt");

let miConsultorio: Consultorio = new Consultorio(oMSPesoNiño, oMSPesoNiña, oMSAlturaNiño, oMSAlturaNiña);


let leon: Paciente = new Paciente ("Leon", 57931277, [
    new Visita (3.5, 50, 0), //mes 0, nacimiento
    new Visita (4, 54, 1), //mes 1
    new Visita (4.3, 57, 2), //mes 2
    new Visita (4.8, 59, 3), //mes 3
    new Visita (5.2, 61, 4), //mes 4
    new Visita (6, 64, 5), //mes 5
    new Visita (6.8, 66, 6), //mes 6
    new Visita (7.4, 70, 7), //mes 7
    new Visita (8, 70.5, 8), //mes 8
    new Visita (8.6, 72, 9), //mes 9
    new Visita (9, 74, 10), //mes 10
    new Visita (9.2, 75, 11) //mes 11
]);

let marcos: Paciente = new Paciente ("Marcos", 47938228, [
    new Visita (3.3, 49, 0), //mes0, nacimiento
    new Visita (3.8, 54, 1), //mes1
    new Visita (4, 57, 2), //mes2
    new Visita (4.3, 59, 3), //mes3
    new Visita (4.8, 61, 4), //mes4
    new Visita (5.3, 64, 5), //mes5
    new Visita (6, 66, 6), //mes6
    new Visita (7, 70, 7) //mes7
])

miConsultorio.agregarPaciente(leon);
let ultimaVisita: Visita = new Visita (9.4, 75, 12);
miConsultorio.agregarVisita(57931277, ultimaVisita);
console.log(`El peso del paciente Leon a sus 3 meses es ${miConsultorio.getPacientePesoMes(57931277, 3)}`);

miConsultorio.agregarPaciente(marcos);
let visitaMes8: Visita = new Visita (7.4, 73, 8);
let visitaMes9: Visita = new Visita (8, 75, 9);
let visitaMes10: Visita = new Visita (8.5, 76, 10);
let visitaMes11: Visita = new Visita (8.9, 78, 11);
let visitaMes12: Visita = new Visita (9.3, 78, 12);
miConsultorio.agregarVisita(47938228, visitaMes8);
miConsultorio.agregarVisita(47938228, visitaMes9);
miConsultorio.agregarVisita(47938228, visitaMes10);
miConsultorio.agregarVisita(47938228, visitaMes11);
miConsultorio.agregarVisita(47938228, visitaMes12);
console.log(`La curva de la altura del paciente Marcos es (Blanca: Marcos, Roja: Niñas, Azul: Niños): `)
miConsultorio.graficarCurvasAltura(47938228);


//miConsultorio.graficarCurvasPeso(57931277);
//miConsultorio.graficarCurvasAltura(57931277);

