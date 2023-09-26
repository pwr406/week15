//importing everything that is needed

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

//passed in createUser as destructed prop.
function CreateUserForm({ createUser }) {
  //all the states for the form
  const [nameState, setNameState] = useState("")
  const [cityState, setCityState] = useState("")
  const [stateState, setStateState] = useState("")
  const [photoState, setPhotoState] = useState("")
  //function for when the form is submitted.
  const handleSubmit = async (event) => {
    event.preventDefault()
    const userData = {
      name: nameState,
      city: cityState,
      state: stateState,
      photo: photoState,
    };

    await createUser(userData);

    setNameState('')
    setCityState('')
    setStateState('')
    setPhotoState('')
  }

  //form for creating the new user.
  return (
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
  );
}

export default CreateUserForm;