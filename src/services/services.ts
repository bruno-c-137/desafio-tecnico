import CONSTANTS from "@/constants";
import axios from "axios";

const ax = axios.create({
    baseURL: import.meta.env.VITE_API,
});

const Services = {
    getStorageToken: () => {
        try {
            const getAuth: any = window.localStorage.getItem(CONSTANTS.STORAGE.AUTH);
            const storageToken: any = JSON.parse(getAuth);
            return storageToken;
        } catch {
            return undefined;
        }
    },
    setStorageToken: (data: any) => {
        window.localStorage.setItem(CONSTANTS.STORAGE.AUTH, JSON.stringify(data));
    },



    login: (body: any) =>
        ax.post(`/auth/login`, JSON.stringify(body), {
            headers: { "Content-Type": "application/json" },
        }),
    cadastro: (body: any) =>
        ax.post(`/auth/register`, JSON.stringify(body), {
            headers: { "Content-Type": "application/json" },
        }),
    addClients: (body: any) =>
        ax.post(`/clients`, JSON.stringify(body), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Services.getStorageToken()?.token}`
            },
        }),
    editClients: (id: number, body: any) =>
        ax.put(`/clients/${id}`, JSON.stringify(body), {
            headers: { "Content-Type": "application/json" },
        }),
    deletClients: (id: number) =>
        ax.delete(`/clients/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Services.getStorageToken()?.token}`
            },

        }),

    listClients: () => `/clients`,

};


export default Services;
