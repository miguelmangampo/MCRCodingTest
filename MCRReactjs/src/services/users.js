import { GET, POST, PUT } from './request';

export const getUsers = async() => {
    try {
        const users = await GET('/users');
        return users.data || [];
    } catch(e) {
        return null;
    }
}

export const getUser = async(id) => {
    try {
        const users = await GET(`/users/${id}`);
        return users.data || {};
    } catch(e) {
        return null;
    }
}

export const AddUser = async(newUser) => {
    try {
        const users = await POST(`/users`, newUser);
        return users.data || {};
    } catch(e) {
        console.log(e);
        return null;
    }
}

export const EditUser = async(newUser) => {
    try {
        const users = await PUT(`/users`, newUser);
        return users.data || {};
    } catch(e) {
        console.log(e);
        return null;
    }
}