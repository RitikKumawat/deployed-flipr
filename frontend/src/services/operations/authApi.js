import toast from "react-hot-toast";

const { setLoading, setToken, setUser } = require("../../slices/authSlice");
const { apiconnector } = require("../apiconnector");
const { authEndpoints } = require("../apis");

const {
    SIGNUP_API,
    LOGIN_API,
} = authEndpoints;


export function Signup(username,email,password,confirmPassword,role,navigate){
    return async(dispatch)=>{
        try {
            dispatch(setLoading(true));
            const response = await apiconnector("POST",SIGNUP_API,{
                username,
                email,
                password,
                confirmPassword,
                role
            })
            console.log("response signup api",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Signup successful")
            if(navigate){

                navigate("/login");
            }
        } catch (error) {
            console.log("Signup api error",error);
            toast.error("Signup failed");
            if(navigate){

                navigate("/signup")   
            }
        }
        dispatch(setLoading(false));
    }
}

export function login(email,password,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response = await apiconnector("POST",LOGIN_API,{
                email,
                password,
            })
            console.log("Login api response",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Login successful")
            dispatch(setToken(response.data.token));
            // console.log("API response token",response.data.token);
            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("user",JSON.stringify(response.data.user));
            dispatch(setUser(response.data.user))
            navigate("/");
        } catch (error) {
            console.log("Login api error",error);
            toast.error("Login failed");
            navigate("/login")   
        }
        dispatch(setLoading(false));
    }
}

export function logout(navigate){
    return async(dispatch)=>{
        try {
            dispatch(setToken(null))
            dispatch(setUser(null))
            navigate("/login");
         
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            toast.success("Logged Out")
        }catch(error){
            console.log(error);
        }
    }
}