import axios from "axios"

// created a common function to call any api easily 
export const commonFunction = async(methods, url, body, header) =>{
    console.log(header, url)
    // console.log("api call", methods, url, body)
    let config = {
        method:methods,
        url,
        data:body,
        headers:header ? header : {"Content-Type":"Application/Json"}
    }

    return await axios(config).then((res)=>{return res}).catch((err)=>{return err})

}