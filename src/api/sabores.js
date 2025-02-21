import axios from "axios"
import { BACK_API } from "."

export const API_URL = async () => {
    return BACK_API
}

//GET

export const fetchSabores = async () => {
    const sabores = await axios.get(`${BACK_API}/Sabores`)
    return sabores.data
}

export const fetchMezclas = async () => {
    const mezclas = await axios.get(`${BACK_API}/Mezclas`)
    return mezclas.data
}



// ADD

export const addSabor = async (newSabor) => {
    try {
        const response = await axios.post(`${BACK_API}/Sabores`, newSabor)
        return response.data
    } catch (error) {
        console.error("Error adding sabor:", error)
        throw error
    }
}

export const addMezcla = async (newMezcla) => {
    try {
        const response = await axios.post(`${BACK_API}/Mezclas`, newMezcla)
        return response.data
    } catch (error) {
        console.error("Error adding mezcla:", error)
        throw error
    }
}

/* addSabor({ Marca: "Adalya", Sabor: "New Flavor", Descripción: "A new fruity taste", Key: 99 })
    .then(data => console.log("Added Sabor:", data))
    .catch(error => console.error(error)) */



// MODIFY

export const updateSabor = async (id, updatedSabor) => {
    try {
        const response = await axios.put(`${BACK_API}/Sabores/${id}`, updatedSabor)
        return response.data
    } catch (error) {
        console.error("Error updating sabor:", error)
        throw error
    }
}

export const updateMezcla = async (id, updatedMezcla) => {
    try {
        const response = await axios.put(`${BACK_API}/Mezclas/${id}`, updatedMezcla)
        return response.data
    } catch (error) {
        console.error("Error updating mezcla:", error)
        throw error
    }
}

/* updateSabor(99, { Marca: "Adalya", Sabor: "Updated Flavor", Descripción: "Updated description" })
    .then(data => console.log("Updated Sabor:", data))
    .catch(error => console.error(error)) */



// DELETE

export const deleteSabor = async (id) => {
    try {
        await axios.delete(`${BACK_API}/Sabores/${id}`)
        return `Sabor with ID ${id} deleted successfully.`
    } catch (error) {
        console.error("Error deleting sabor:", error)
        throw error
    }
}

export const deleteMezcla = async (id) => {
    try {
        await axios.delete(`${BACK_API}/Mezclas/${id}`)
        return `Mezcla with ID ${id} deleted successfully.`
    } catch (error) {
        console.error("Error deleting mezcla:", error)
        throw error
    }
}

/* deleteSabor(1)
    .then(message => console.log(message))
    .catch(error => console.error(error)) */