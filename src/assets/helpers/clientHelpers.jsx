import { clientData } from "./../Data/clientData.jsx";

export const getAllClients = () => {
    return clientData.filter(client => client.published);
};

export const getFeaturedClients = () => {
    return clientData.filter(client => client.published && client.featured);
};

export const getClientById = (id) => {
    return clientData.find(client => client.id === id);
};

export const getClientBySlug = (slug) => {
    return clientData.find(client => client.slug === slug);
};