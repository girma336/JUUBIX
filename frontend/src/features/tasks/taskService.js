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


const updateTask = async (task, token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + task._id, task, config)
    return response.data
}


const taskService = {
    createTask,
    getTasks,
    deleteTask,
    updateTask
}

export default taskService 