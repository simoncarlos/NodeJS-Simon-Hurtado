import { productDao } from "../containers/daos/product";

export const getNewProductId = async () => {
    const data = await productDao.getObjects();
    if( data.length ){
        return data[ data.length - 1 ].id + 1
    }else{
        return 1
    }
}