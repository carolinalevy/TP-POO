"use strict";
exports.__esModule = true;
var asciichart = require("asciichart");
var fs = require("fs");
var Consultorio = /** @class */ (function () {
    function Consultorio(curvaOMSPesoNiño, curvaOMSPesoNiña, curvaOMSAlturaNiño, curvaOMSAlturaNiña) {
        this.curvaOMSPesoNiño = curvaOMSPesoNiño;
        this.curvaOMSPesoNiña = curvaOMSPesoNiña;
        this.curvaOMSAlturaNiño = curvaOMSAlturaNiño;
        this.curvaOMSAlturaNiña = curvaOMSAlturaNiña;
        this.listaPacientes = [];
    }
    Consultorio.prototype.agregarPaciente = function (paciente) {
        this.listaPacientes.push(paciente);
    };
    Consultorio.prototype.agregarVisita = function (dni, visita) {
        for (var i = 0; i < this.listaPacientes.length; i++) {
            if (dni == this.listaPacientes[i].getDni()) {
                this.listaPacientes[i].agregarVisita(visita);
            }
        }
    };
    Consultorio.prototype.getPacientePesoMes = function (dni, mes) {
        for (var i = 0; i < this.listaPacientes.length; i++) {
            if (dni == this.listaPacientes[i].getDni()) {
                var pesoMes = this.listaPacientes[i].getPesoMes(mes);
                return pesoMes;
            }
        }
        return -1;
    };
    Consultorio.prototype.graficarCurvasPeso = function (dni) {
        for (var i = 0; i < this.listaPacientes.length; i++) {
            if (dni == this.listaPacientes[i].getDni()) {
                var arrayPesos = this.listaPacientes[i].getPeso();
                var config = {
                    colors: [
                        asciichart.blue,
                        asciichart.red,
                        asciichart["default"]
                    ]
                };
                console.log(asciichart.plot([this.curvaOMSPesoNiño, this.curvaOMSPesoNiña, arrayPesos], config));
            }
        }
    };
    Consultorio.prototype.graficarCurvasAltura = function (dni) {
        for (var i = 0; i < this.listaPacientes.length; i++) {
            if (dni == this.listaPacientes[i].getDni()) {
                var arrayAlturas = this.listaPacientes[i].getAltura();
                var config = {
                    colors: [
                        asciichart.blue,
                        asciichart.red,
                        asciichart["default"]
                    ]
                };
                console.log(asciichart.plot([this.curvaOMSAlturaNiño, this.curvaOMSAlturaNiña, arrayAlturas], config));
            }
        }
    };
    return Consultorio;
}());
var Paciente = /** @class */ (function () {
    function Paciente(nombre, dni, visitas) {
        this.nombre = nombre;
        this.dni = dni;
        this.visitas = visitas;
    }
    Paciente.prototype.agregarVisita = function (visita) {
        this.visitas.push(visita);
    };
    Paciente.prototype.getNombre = function () {
        return this.nombre;
    };
    Paciente.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Paciente.prototype.getDni = function () {
        return this.dni;
    };
    Paciente.prototype.setDni = function (dni) {
        this.dni = dni;
    };
    Paciente.prototype.getPeso = function () {
        var arrayPesos = [];
        for (var i = 0; i < this.visitas.length; i++) {
            arrayPesos.push(this.visitas[i].getPeso());
        }
        return arrayPesos;
    };
    Paciente.prototype.getPesoMes = function (i) {
        return this.visitas[i].getPeso();
    };
    Paciente.prototype.getAltura = function () {
        var arrayAlturas = [];
        for (var i = 0; i < this.visitas.length; i++) {
            arrayAlturas.push(this.visitas[i].getAltura());
        }
        return arrayAlturas;
    };
    Paciente.prototype.getAlturaMes = function (i) {
        return this.visitas[i].getAltura();
    };
    return Paciente;
}());
var Visita = /** @class */ (function () {
    function Visita(peso, altura, edadBebe) {
        this.peso = peso;
        this.altura = altura;
        this.edadBebe = edadBebe;
    }
    Visita.prototype.getPeso = function () {
        return this.peso;
    };
    Visita.prototype.getAltura = function () {
        return this.altura;
    };
    Visita.prototype.getedadBebe = function () {
        return this.edadBebe;
    };
    return Visita;
}());
//let marcos: Paciente = new Paciente ("Marcos", 54892722, [3.3, 4, 4.5, 5.2, 6.5, 7.6, 8, 8.5, 8.7, 9, 9.2, 9.5, 10.1], [50, 56, 58, 60.1, 62, 63, 64, 66, 69, 70, 72, 74, 76]);
function lectorArchivos(archivo) {
    var valores = fs.readFileSync(archivo, "utf-8");
    var arrayValores = valores.split(",");
    var arrayNumeros = [];
    for (var i = 0; i < arrayValores.length; i++) {
        arrayNumeros.push(parseFloat(arrayValores[i]));
    }
    return arrayNumeros;
}
var oMSPesoNiño = lectorArchivos("curvaOMSPesoNiño.txt");
var oMSPesoNiña = lectorArchivos("curvaOMSPesoNiña.txt");
var oMSAlturaNiño = lectorArchivos("curvaOMSAlturaNiño.txt");
var oMSAlturaNiña = lectorArchivos("curvaOMSAlturaNiña.txt");
var miConsultorio = new Consultorio(oMSPesoNiño, oMSPesoNiña, oMSAlturaNiño, oMSAlturaNiña);
var leon = new Paciente("Leon", 57931277, [
    new Visita(3.5, 50, 0),
    new Visita(4, 54, 1),
    new Visita(4.3, 57, 2),
    new Visita(4.8, 59, 3),
    new Visita(5.2, 61, 4),
    new Visita(6, 64, 5),
    new Visita(6.8, 66, 6),
    new Visita(7.4, 70, 7),
    new Visita(8, 70.5, 8),
    new Visita(8.6, 72, 9),
    new Visita(9, 74, 10),
    new Visita(9.2, 75, 11)
]);
var marcos = new Paciente("Marcos", 47938228, [
    new Visita(3.3, 49, 0),
    new Visita(3.8, 54, 1),
    new Visita(4, 57, 2),
    new Visita(4.3, 59, 3),
    new Visita(4.8, 61, 4),
    new Visita(5.3, 64, 5),
    new Visita(6, 66, 6),
    new Visita(7, 70, 7)
]);
miConsultorio.agregarPaciente(leon);
var ultimaVisita = new Visita(9.4, 75, 12);
miConsultorio.agregarVisita(57931277, ultimaVisita);
console.log("El peso del paciente Leon a sus 3 meses es " + miConsultorio.getPacientePesoMes(57931277, 3));
miConsultorio.agregarPaciente(marcos);
var visitaMes8 = new Visita(7.4, 73, 8);
var visitaMes9 = new Visita(8, 75, 9);
var visitaMes10 = new Visita(8.5, 76, 10);
var visitaMes11 = new Visita(8.9, 78, 11);
var visitaMes12 = new Visita(9.3, 78, 12);
miConsultorio.agregarVisita(47938228, visitaMes8);
miConsultorio.agregarVisita(47938228, visitaMes9);
miConsultorio.agregarVisita(47938228, visitaMes10);
miConsultorio.agregarVisita(47938228, visitaMes11);
miConsultorio.agregarVisita(47938228, visitaMes12);
console.log("La curva de la altura del paciente Marcos es (Blanca: Marcos, Roja: Ni\u00F1as, Azul: Ni\u00F1os): ");
miConsultorio.graficarCurvasAltura(47938228);
//miConsultorio.graficarCurvasPeso(57931277);
//miConsultorio.graficarCurvasAltura(57931277);
