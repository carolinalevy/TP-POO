Descripción del Proyecto.

El proyecto consiste en un programa donde se ven el peso y la altura del bebé en cada visita al pediatra por cada mes de vida, desde su nacimiento (mes 0), hasta cuando cumple el primer año de vida. 
Existen tres clases: Consultorio, Paciente y Visita. La clase Consulrotio se compone de la clase Paciente, compuesta a su vez de la clase Visita.
En el código hay una funcion "leerArchivos", desde la cual se acceden a los archivos donde estan los datos para crear las curvas "estandares" dadas por la OMS.
La idea del proyecto es graficar, desde la clase Consultorio, las curvas de cada paciente para Altura y para Peso, junto con las curvas de la OMS. En cada gráfico aparecen tres curvas, en color Azul la curva para Niños, en Rojo la curva para Niñas, y en blanoc la curva del paciente que se esta viendo. Esto se ve así para poder comparar en el mismo grafico los valores del paciente con la curva dada por la OMS según sea niño o niña.
Aparte, se pueden ingresar pacientes a los cuales se le pueden ingresar visitas, con sus correspondientes datos de peso y altura obtenidos.

Descripción de la libreria ASCII CHART

La función principal de la libreria es mostrar por consola un grafico con los datos que se le provean. La funcion .plot es la que se encarga de esto. 
Como parametros se le pasa un array de arrays, los cuales se dibujan en el mismo gráfico. Se les puede poner un color a cada linea del grafico para distinguirlas. Esto se puede hacer pasando como segundo parametro una variable ya armada, que la provee la documentacion, llamada "config". 
