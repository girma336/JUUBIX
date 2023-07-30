import axios from "axios";

const API_URL = '/api/tasks/'

const createTask = async(task, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const respo = await axios.post(API_URL, task, config)
   return respo.data
}

const getTasks = async(token) => {
    const config = {
        headers: {
            Authorization : `Bearer ${token}`,
        }
    }

   const respo = await axios.get(API_URL, config)
   console.log(respo, "Girma tarekegn")
   return respo.data
  
}


const deleteTask = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const respo = await axios.delete(API_URL + id, config)
   return respo.data
}


const taskService = {
    createTask,
    getTasks,
    deleteTask
}

export default taskService 