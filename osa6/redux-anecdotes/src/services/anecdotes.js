/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const create = async (newObject) => {
    const request = await axios.post(baseUrl, newObject)
    return request.data
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => {
        return response.data
    })
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => {
        console.log("Remove", response.status)
        return response.status
    })
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  remove: remove 
}