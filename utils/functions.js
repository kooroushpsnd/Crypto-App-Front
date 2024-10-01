import axios from "axios"

export async function getRole(token){
    const response = await axios.get('http://localhost:3000/users/role' ,{
        headers : { Authorization: `Bearer ${token}`}
    })

    if(response.status == 200){
        localStorage.setItem('role' ,response.data.role)
        localStorage.setItem('name' ,response.data.name)
        localStorage.setItem('email' ,response.data.email)
    }
}