import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
    let uuid_token = localStorage.getItem('UUIDTOKEN') ? localStorage.getItem('UUIDTOKEN') : uuidv4()
    localStorage.setItem('UUIDTOKEN', uuid_token)
    return uuid_token
}