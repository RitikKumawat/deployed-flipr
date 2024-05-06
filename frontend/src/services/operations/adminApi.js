import { useSelector } from "react-redux";
import { apiconnector } from "../apiconnector";
import toast from "react-hot-toast";


const { setLoading, setInstances } = require("../../slices/adminSlice");
const { adminEndpoints } = require("../apis");

// const {token} = useSelector((state)=>state.auth);

const{
    CREATE_INSTANCE,
    CREATE_DATABASE,
    GET_INSTANCE,
    REMOVE_DATABASE,
    PUSH_DATABASE,
    ASSIGN_ROLE,
    CHANGE_PASSWORD,
    REMOVE_USER,
    REMOVE_USER_ACCESS,
    ADD_USER, 
    CREATE_USER,
    FETCH_DATABASE
} = adminEndpoints;

export function createInstance(host,port,token,navigate){
    return async(dispatch)=>{
        try {
            const response = await apiconnector("POST",CREATE_INSTANCE,{
                host,
                port,
            },{"Content-Type":"application/json",Authorization: `Bearer ${token}`})
            console.log("response create instance api",response);
            if(!response.data.success){
                throw new Error("Could not create instance")
            }
        } catch (error) {
            console.log("error in create instance api",error);
            toast.error(error.message);
        }
        dispatch(setLoading(false))
    }
}

export function createDatabase(dbName,instanceId,token,navigate){
    return async(dispatch)=>{
        try {
            const response = await apiconnector("POST",CREATE_DATABASE,{
                dbName,
                instanceId
            },{"Content-Type":"application/json",Authorization: `Bearer ${token}`})
            console.log("response create database api",response);
            if(!response.data.success){
                throw new Error("Could not create database")
            }
        } catch (error) {
            console.log("error in creating database api",error);
            toast.error(error.message);
        }
        dispatch(setLoading(false))
    }
}
export function getInstances(token,navigate){
    return async(dispatch)=>{
        try {
            const response = await apiconnector("POST",GET_INSTANCE,{},{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            })
            console.log("response get instance api",response);
            if(!response.data.success){
                throw new Error("Could not get instance")
            }
            dispatch(setInstances(response.data.instances));
        } catch (error) {
            console.log("error in get instance api",error);
            toast.error(error.message);
        }
        dispatch(setLoading(false))
    }
}
export function removeDatabase(dbName,token,navigate){
    return async(dispatch)=>{
        try {
            const response = await apiconnector("DELETE",REMOVE_DATABASE,{
                dbName,
            },{"Content-Type":"multipart/form-data",Authorization: `Bearer ${token}`})
            console.log("response remove database api",response);
            if(!response.data.success){
                throw new Error("Could not remove database")
            }
        } catch (error) {
            console.log("error in removing database api",error);
            toast.error(error.data.message);
        }
        dispatch(setLoading(false))
    }
}
export function fetchDatabases(instanceId,token){
    return async(dispatch)=>{
        try {
            const response = await apiconnector("POST",FETCH_DATABASE,{instanceId},{"Content-Type":"application/json",Authorization: `Bearer ${token}`})
            console.log("RESPONSE fetch databases",response);
            if(!response.data.success){
                throw new Error("Could not fetch database")
            }
        } catch (error) {
                console.log("error in fetch database api",error);
                toast.error(error.message);
        }
    }
}
export function pushDatabase(port,dbName,token,navigate){
    return async(dispatch)=>{
        try {
            const response = await apiconnector("POST",PUSH_DATABASE,{
                port,
                dbName
            },{"Content-Type":"multipart/form-data",Authorization: `Bearer ${token}`})
            console.log("response push database api",response);
            if(!response.data.success){
                throw new Error("Could not push database ")
            }
        } catch (error) {
            console.log("error in push database api",error);
            toast.error(error.message);
        }
        dispatch(setLoading(false))
    }
}
export function assignRole(email,databaseName,accessRole,token,navigate){
    return async(dispatch)=>{
        try {
            const response = await apiconnector("POST",ASSIGN_ROLE,{
                email,
                databaseName,
                accessRole
            },{"Content-Type":"application/json",Authorization: `Bearer ${token}`})
            console.log("response assign role api",response);
            if(!response.data.success){
                throw new Error("Could not assign role")
            }
        } catch (error) {
            console.log("error in assign role api",error);
            toast.error(error.message);
        }
        dispatch(setLoading(false))
    }
}
export function changePassword(email,currentPassword,newPassword,token,){
    return async(dispatch)=>{
        try {
            const response = await apiconnector("POST",CHANGE_PASSWORD,{
                email,
                currentPassword,
                newPassword
            },{"Content-Type":"multipart/form-data",Authorization: `Bearer ${token}`})
            console.log("response change password api",response);
            if(!response.data.success){
                throw new Error("Could not change password")
            }
        } catch (error) {
            console.log("error in change password api",error);
            toast.error(error.message);
        }
        dispatch(setLoading(false))
    }
}
export function removeUser(email,token,navigate){
    return async(dispatch)=>{
        try {
            const response = await apiconnector("DELETE",REMOVE_USER,{
                email,
            },{"Content-Type":"multipart/form-data",Authorization: `Bearer ${token}`})
            console.log("response remove user api",response);
            if(!response.data.success){
                throw new Error("Could not remove user")
            }
        } catch (error) {
            console.log("error in remove user api",error);
            toast.error(error.message);
        }
        dispatch(setLoading(false))
    }
}
export function removeUserAccess(email,dbName,token,navigate){
    return async(dispatch)=>{
        try {
            const response = await apiconnector("DELETE",REMOVE_USER_ACCESS,{
                email,
                dbName,
            },{"Content-Type":"multipart/form-data",Authorization: `Bearer ${token}`})
            console.log("response remove access api",response);
            if(!response.data.success){
                throw new Error("Could not remove access ")
            }
        } catch (error) {
            console.log("error in remove access api",error);
            toast.error(error.message);
        }
        dispatch(setLoading(false))
    }
}
export function addUser(email,dbName,token,navigate){
    return async(dispatch)=>{
        try {
            const response = await apiconnector("POST",ADD_USER,{
                email,
                dbName,
            },{"Content-Type":"application/json",Authorization: `Bearer ${token}`})
            console.log("response add user api",response);
            if(!response.data.success){
                throw new Error("Could not add user ")
            }
        } catch (error) {
            console.log("error in add user api",error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false))
    }
}

export function createUser(username,email,password,confirmPassword,role,token){
    return async(dispatch)=>{
        try {
            const response = await apiconnector("POST",CREATE_USER,{
                username,
                email,
                password,
                confirmPassword,
                role
            },{"Content-Type":"application/json",Authorization: `Bearer ${token}`})
            console.log("response create user api",response);
            if(!response.data.success){
                throw new Error("Could not create user ")
            }
            toast.success("User created");
        } catch (error) {
            console.log("Error in creating user",error);
            toast.error(error.response.data.message);
        }
    }
}
