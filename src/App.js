//Importing everything that is needed into App.

import './App.css';
import NavBar from './components/NavBar'
import { useEffect, useState } from "react"
import UserDisplay from './components/UserDisplay'
import CreateUserForm from './components/CreateUserForm'
import usersAPI from './components/Api'



function App() {
  //create state to keep track of the users
  const [userList, setUserList] = useState([]);

  //useEffect to fectch users from API and then set state to list of users that we get. [] at the end makes it so it only runs once at the start.
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(usersAPI)
      const data = await response.json()
      setUserList(data)
    }
    fetchUsers()
  }, [])

  //async function to delete user - sends Id that is selected by button to API to delete.
  const deleteUser = async (idToDelete) => {
    const response = await fetch(usersAPI + idToDelete, {
      method: "DELETE"
    })
    //update state using current state and filter to only display users that haven't been deleted.
    setUserList(userList.filter(user => user.id !== idToDelete))
  }
  //function to create a user - post the information to the API
  const createUser = async (userData) => {
    const response = await fetch(usersAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    //variable to store the new user that was created - get response from the API
    const newUser = await response.json();
    //update state using spread operator to grab everything in current state and add NewUser
    setUserList([...userList, newUser])
  }



  //rendering of the app - some light Bootstrap for formatting/visuals passing props to CreateUserForm and User Display
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <body>
        <div className="container-fluid">
          <div className="row justify-content-center pt-3 mb-3">
            <div className="col-4">
              <h2 className="text-center">ADD A NEW USER</h2>
              <CreateUserForm createUser={createUser} />

            </div>
          </div>
        </div>
        <UserDisplay userList={userList} deleteUser={deleteUser} setUserList={setUserList} />
      </body>
    </div>
  );
}

export default App;
