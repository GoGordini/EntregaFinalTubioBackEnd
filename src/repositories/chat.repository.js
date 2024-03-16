export default class ChatRepository {
    constructor (dao){
        this.dao=dao;
    }

    getAllRepository = async ()=>{
        const carts = await this.dao.getAll();
        return carts;
        }
        
            
}