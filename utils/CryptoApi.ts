import axios from "axios"
const url = 'http://localhost:3000/crypto'

export async function getAllCrypto(){
    const response = await axios.get(url)

    if(response.data.crypto == "no data to show") return null
    return response.data.crypto
}

export async function createCrypto(crypto:any ,token:string){
    try{
        const response = await axios.post(url ,crypto ,{
                headers : { Authorization: `Bearer ${token}`}
            })
        return response.data.crypto
    }catch(err: any){
        return err.response.data.message
    }
}

export async function removeCrypto(name: string ,token:string){
    try{
        const response = await axios.delete(`${url}/${name}` ,{
                headers : { Authorization: `Bearer ${token}`}
            })
        return response.data.crypto
    }catch(err: any){
        return err.response.data.message
    }
}