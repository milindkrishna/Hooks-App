import './App.css'
import React, { useState, useEffect } from 'react'

function App() {

  const [email, setemail] = useState('milind@gmail.com')
  
  const [count, setcount] = useState(0)

  const [data, setdata] = useState([])

  const [userId, setuserId] = useState(1)

  const [toggle, settoggle] = useState(true);

  const [isLoading, setIsLoading] = useState(true);


  function handleChange(e) {
    setemail(e.target.value)
  }
  function increment() {
    setcount(count + 1)
  }

  function toogler(){
    settoggle(!toggle)
  }

  useEffect(() => {
    const fetchdata = async () => {
    try{
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    const response = await fetch(url)
    const data = await response.json()
    setdata(data)
    } catch (error) {
      console.log(error)
    }
    }

    fetchdata()
    setIsLoading(false);
  }, [userId]);

   if (isLoading) {
    return (
      <div className='loader'>
        <div className='loader-spinner'></div>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="btn btn-primary d-grid gap-2 col-6 mx-auto" onClick={toogler}>Click to Toggle</button>
      {toggle && (
      <ul className="list-group">
          <li className="list-group-item">An item</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
          <li className="list-group-item">A fourth item</li>
          <li className="list-group-item">And a fifth one</li>
        </ul>
      )}
      <br />
      <br />
      
      <input className="input-group mb-3" value={email} onChange={handleChange} />
      <p>Email : {email}</p>
      <button className="btn btn-primary" onClick={increment}>Click me to increment</button>
      <br />
      <br />
      Count : {count}
      <br />
      <br />
      <button className="btn btn-primary" onClick={() => setuserId(userId + 1)}>
        Click to increase userid
      </button>
      &nbsp;
      <button className="btn btn-danger" onClick={() => {
      if(userId === 0) {
        return;
      }
      setuserId(userId - 1)}}>
        Click to decrease userid
      </button>
      <br />
      <br />
      Fetch API by changing user id
      <br/>
      User Id fetched : {userId}
      <br />
      <br />
      {data.map((user) => {
      return(
        <ul className="list-group" key={user.id}>
          <li className="list-group-item list-group-item-primary">{user.title}</li>
          <br/>
        </ul>
      )
    })}
    </div>
  )
}

export default App;