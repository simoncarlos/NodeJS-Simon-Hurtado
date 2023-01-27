import { ListadoProductos ,ListadoChats } from "../repository/index.js";
import { Aplication } from "./appServices.js";

export const aplication = new Aplication( ListadoProductos, ListadoChats );