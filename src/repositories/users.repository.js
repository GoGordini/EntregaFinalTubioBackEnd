import UsersDto from '../DTO/users.dto.js';

export default class UsersRepository {
    constructor (dao){
        this.dao=dao;
    }

        getUserByEmailRepository = async (email) => {
            const user = await this.dao.getUserByEmail(email);
            if (!user){return user};
            const userToReturn = new UsersDto(user);
            return userToReturn;
        }     
        
        getUserByIdRepository = async (uid) => {
            const user = await this.dao.getUserById(uid);
            if (!user){return user};
            return user;
        }    
        
        updatePremiumStatusRepository = async (uid,role) =>{
            const user= await this.dao.updatePremiumStatus(uid,role);
            return user;
        }

        uploadDocumentsRepository = async (uid,userDocs) =>{
            const result = await this.dao.uploadDocuments(uid,userDocs);
            return result;
        }

        getAllUsersRepository = async () =>{
            const result = await this.dao.getAllUsers();
            return result;
        }

        deleteAllUsersRepository = async () =>{
            const result = await this.dao.deleteAllUsers();
            return result;
        }

        deleteOneUserRepository = async (uid) =>{
            const result = await this.dao.deleteOneUser(uid);
            return result;
        }

        saveRepository = async () => { 
            const result = await this.dao.save();
            return result;
        }
        
        resetPasswordRepository = async (email,password) => {
            const result = await this.dao.resetPassword(email,password);
            return result;
        }
        
}
