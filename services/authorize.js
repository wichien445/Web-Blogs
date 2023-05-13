//SAVE TOKEN IN SESSIOB STORAGE
export const authenticate = (response, next)=>{
    if(window !== "undefined"){
        //SAVE TOKEN
        sessionStorage.setItem("token", JSON.stringify(response.data.token))
        sessionStorage.setItem("user", JSON.stringify(response.data.username))
    }
    next()
}

//GET TOKEN
export const getToken=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }
    }else{
        return false
    }
}

//GET USER
export const getUser=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"))
        }
    }else{
        return false
    }
}

//LOGOUT
export const logout=(next)=>{
    if(window !== "undefined"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }
    next()
}