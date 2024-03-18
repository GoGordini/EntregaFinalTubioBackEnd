// import configs from "./config.js";
// console.log(configs);
import { subDays, format } from 'date-fns';

// Obtener la fecha actual
const today = new Date();

// Calcular la fecha de hace dos días atrás
const twoDaysAgo = subDays(today, 2);

// // Formatear las fechas para visualización
// const formattedToday = format(today, 'dd/MM/yyyy');
// const formattedTwoDaysAgo = format(twoDaysAgo, 'dd/MM/yyyy');

// console.log('Hoy es:', formattedToday);
// console.log('Dos días atrás fue:', formattedTwoDaysAgo);

console.log(today,twoDaysAgo)