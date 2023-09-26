//importing my things.

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import usersAPI from './Api';


//starting the app, bringing in multiple destructed props.
export default function UpdateUser({ onClose, showUpdateForm, userList, userId, setUserList }) {

  //different states for the form.
  const [show, setShow] = useState(false); //THIS STATE MAY NOT BE NEEDED? PASSING FROM UserDisplay instead? 
  const [nameState, setNameState] = useState("")
  const [cityState, setCityState] = useState("")
  const [stateState, setStateState] = useState("")
  const [photoState, setPhotoState] = useState("")



  //function to handle when the submit button is pressed.
  const handleSubmit = async (event) => {
    event.preventDefault()
    const userIdToUpdate = userId
    const userToUpdate = userList.find(user => user.id === userIdToUpdate);
    //this is to make it so if nothing is changed in the form, it doesn't override the information that is already there with blank info.
    const updatedUser = {
      ...userToUpdate,
      name: nameState !== '' ? nameState : userToUpdate.name,
      city: cityState !== '' ? cityState : userToUpdate.city,
      state: stateState !== '' ? stateState : userToUpdate.state,
      photo: photoState !== '' ? photoState : userToUpdate.photo,
    }

    const userIndex = userList.findIndex(user => user.id === userIdToUpdate)

    const updatedUserList = [...userList];
    updatedUserList[userIndex] = updatedUser; //adding the update to the state and making sure it renders.

    const response = await fetch(usersAPI + userIdToUpdate, { //this still seems to work but seems like it might be in the wrong spot?
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser)
    })

    setUserList(userList.map(user => user.id === userIdToUpdate ? { ...user, ...updatedUser } : user)) //updating the state.
    //resetting the form to blank when it's closed.
    setNameState('')
    setCityState('')
    setStateState('')
    setPhotoState('')
    //closing the offcanvas element.
    onClose()

  }
  //created an offcanvas element for the update form.
  return (
    <>

      <Offcanvas show={showUpdateForm} onHide={onClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Update The User</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="User's Full Name" value={nameState}
                onChange={(event) => setNameState(event.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="City" value={cityState}
                onChange={(event => setCityState(event.target.value))} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="State" value={stateState}
                onChange={(event) => setStateState(event.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoto">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control type="url" placeholder="photo" value={photoState}
                onChange={(event) => setPhotoState(event.target.value)} />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
