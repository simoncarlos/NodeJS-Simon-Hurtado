import { daoChats } from "../persistence/daos/daoChats.js";
import { daoProducts } from "../persistence/daos/daoProducts.js";
import { ProductList } from "./ProductsRepository.js";
import { ChatList } from "./ChatRepository.js";

export const ListadoProductos = new ProductList( daoProducts );
export const ListadoChats = new ChatList( daoChats );
