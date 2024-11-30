import axios from "axios"
const url = 'http://localhost:3000/users'

export async function Signup(form:any){
    try{
        const response = await axios.post(`${url}/signup` ,form)

        return response.data
    }catch(err: any){
        return err.response.data.message
    }
}

export async function Login(form:any){
    try{
        const response = await axios.post(`${url}/login` ,form)

        return response.data
    }catch(err: any){
        return err.response.data.message
    }
}

export async function getAllUsers(token:any){
    const response = await axios.get(url ,{
        headers : { Authorization: `Bearer ${token}`}
    })

    if(response.status == 200){
        return response.data
    }
}

export async function deleteUser(id:any ,token:any){
    const response = await axios.delete(`${url}/${id}` ,{
        headers : { Authorization: `Bearer ${token}`}
    })

    if(response.status == 204){
        return response.data
    }
    return response.data
}

export async function ChangePassword(form:any ,token:string){
    try{
        const res = await axios.patch(`${url}/updateMyPassword` ,form ,{
                headers : { Authorization: `Bearer ${token}`}
        })

        return res.data
    }catch(err: any){
        return err.response.data.message
    }
}

export async function updateUser(info: {name?:string ,email?: string} ,token:string){
    try{
        const response = await axios.patch(`${url}/updateMe` ,info ,{
            headers : { Authorization: `Bearer ${token}`}
        })

        return response.data.data.user
    }catch(err: any){
        return err.response.data.message
    }
}

export function setUserDetail(form: any){
    localStorage.setItem('token' ,form.token)
    localStorage.setItem('role' ,form.role)
    localStorage.setItem('name' ,form.data.user.name)
    localStorage.setItem('email' ,form.data.user.email)
}

export function removeUserDetail(){
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('name')
    localStorage.removeItem('email')
}