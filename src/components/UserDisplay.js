//importing all the things I need to
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import UpdateUser from './UpdateUser'

//starting the component - bring in destructed props that were set on App.
export default function UserDisplay({ userList, deleteUser, setUserList }) {

  //states for showing the update form and for storing userId when button is pressed
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  //function to open the offcanvas component and pass in the UserId.
  const openUpdateForm = (userId) => {
    setSelectedUserId(userId);
    setShowUpdateForm(true);

  };
  //function to close the form
  const closeUpdateForm = () => {
    setSelectedUserId(null);
    setShowUpdateForm(false);
  };
  //created a table to display the users and their information. Added 
  //updateUser at the end and passed multiple props including state.
  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID #</th>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Photo</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td><img src={user.photo} className="user-photo" /></td>
              <td className="align-middle">
                <div>
                  <Button variant="outline-danger" onClick={() => deleteUser(user.id)}>Delete</Button>
                </div>
                <div className="pt-3">
                  <Button variant="outline-success" onClick={() => openUpdateForm(user.id)}>Update</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <UpdateUser
        userId={selectedUserId}
        onClose={closeUpdateForm}
        showUpdateForm={showUpdateForm}
        userList={userList}
        setUserList={setUserList}
      />

    </>
  );
}
