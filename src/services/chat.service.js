import { ChatManager } from '../dao/factory.js';
import { chatPath} from '../utils.js';
import  ChatManagerRepository  from '../repositories/chat.repository.js';

const chatManager = new ChatManager(chatPath);
const chatManagerRepository= new ChatManagerRepository(chatManager);

export const getChat= async () => {
    const cart = await chatManagerRepository.getAllRepository()
    return cart;
}