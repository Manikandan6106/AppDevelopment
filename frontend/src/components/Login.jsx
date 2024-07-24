import React,{useState} from 'react';

function Login(){
    
    const [data,setData]=useState({email:'',password:''});
    

    const handleChange=(event)=>{
        const{name,value}=event.target;
        setData({...data,[name]:value})
         console.log(data.email);
       
    }
    
    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(data);
    }
    
    return(
        <div>
             <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Username : </label>
                <input
                type="email"
                placeholder="Enter Email"
                name='email'
                value={data.email}
                onChange={handleChange}/>
                </div>

                <div>
                <label>Password : </label>
                <input
                type="password"
                placeholder="Enter Password"
                name='password'
                value={data.password}
                onChange={handleChange}/>
                </div>
                <button type="submit">Login</button> 
            </form>
                        
        </div>
       
    )
}

export default Login;