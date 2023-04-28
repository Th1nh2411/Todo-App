import * as httpRequest from '../utils/httpRequest';

export const getUsers = async () => {
    try {
        const res = await httpRequest.get(`users`); //account
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const getTasks = async (id) => {
    try {
        const res = await httpRequest.get(`users/${id}/todos`); //account
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
export const markDone = async (id) => {
    try {
        const res = await httpRequest.patch(`todos/${id}`, { completed: true }); //account
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
};
