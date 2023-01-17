import { cartDao } from "../containers/daos/cart/index.js";

export const getNewCartId = async () => {
    const data = await cartDao.getObjects();
    if( data.length ){
        return data[ data.length - 1 ].id + 1
    }else{
        return 1
    }
}