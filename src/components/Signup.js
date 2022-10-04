import {React,useState} from 'react'
import {useNavigate} from 'react-router-dom'
function Signup(props) {
  let navigate=useNavigate()
    const [creds,setCreds]=useState({name:"",Email:"",password:"",cpassword:""})
    const host="http://localhost:5000"
    const handlesubmit=async (e)=>{
      if(creds.cpassword===creds.password)
      {
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:creds.name,Email:creds.Email,password:creds.password})
          });
          const json=await response.json()
          console.log(json);
          if(json.success)
          {
            //redirect
            localStorage.setItem('token',json.authtoken)
            navigate("/");
            props.showAlert("Account Created Successfully","success")
          }
          else
          {
            
            props.showAlert(json.error,"danger")
          }
        }
        else
        {
          e.preventDefault()
          props.showAlert("Confirm Password must be same as Password","danger")
        }
    }
    const onchange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }
  return (
    <div className='container mt-3'>
      <h2>SignUp to continue with iNotebook</h2>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name'onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="Email" name='Email'onChange={onchange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password'onChange={onchange}  minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword'onChange={onchange} minLength={5} />
        </div>
        <div className="mb-3 form-check">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Signup
