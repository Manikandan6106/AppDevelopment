// import React, { useState } from 'react';

// function Register(){
    
//     const [regData,setRegData]=useState({username:'',email:'',contact:'',password:'',cpassword:''});

//     const handleChange=(event)=>{
//         const{name,value}=event.target;
//         setRegData({...regData,[name]:value})

//     }

//     const handleSubmit=(event)=>{
//         event.preventDefault();
//         console.log(regData);
//     }

//     return(
//         <div>
//         <h1>Register Form</h1>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Username: </label>
//             <input
//               type="text"
//               name="username"
//               value={regData.username}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Email: </label>
//             <input
//               type="email"
//               name="email"
//               value={regData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Contact Number: </label>
//             <input
//               type="tel"
//               name="contact"
//               value={regData.contact}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={regData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Confirm Password:</label>
//             <input
//               type="password"
//               name="cpassword"
//               value={regData.cpassword}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit">Register</button>
//         </form>
//       </div>
//     )
// }

// export default Register;