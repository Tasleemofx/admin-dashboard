import React, {useState} from 'react';
import Table from "@mui/material/Table";
import Notification from "./Notification";
import Form from './Form';
import { useDispatch } from "react-redux";
import { editUser } from "../features/admin/adminSlice";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const Tables = ({adminUsers, handleDelete, handleEdit}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [identifier, setIdentifier] = useState(null)
  const dispatch = useDispatch();

  // state for Notification
  const [message, setMessage] = useState(null);
  const [Class, setClass] = useState(null);
  // state for payload
  const [name, setName] = useState("");
  const [nameToEdit, setNameToEdit]= useState(null)
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleUsername = (e) => {
    setUserName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editUser({
        name: name,
        username: userName,
        email: email,
        address: { city: city },
        id: identifier,
      })
    );
    setIsOpen(false)
    setMessage("User Modified successfully");
    setClass("success");
    setTimeout(() => {
      setMessage(null);
      setClass(null);
    }, 5000);
    setName("");
    setUserName("");
    setCity("");
    setEmail("");
  };

  // const handleEdit = (row) => {
  //   setIsOpen(true)
  //   setIdentifier(row.id);
  //   setNameToEdit(row.name)
  //   setEmail(row.email);
  //   setUserName(row.username);
  //   setCity(row.city)
  // };
  const handleCancel = () => {
    setIsOpen(false);
    setName("");
    setUserName("");
    setCity("");
    setEmail("");
  };
  return (
    <>
      <Notification message={message} Class={Class} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          {adminUsers.map((row) => (
            <TableBody key={row.name}>
              {isOpen ? (
                <Form
                  name={nameToEdit}
                  username={userName}
                  email={email}
                  address={city}
                  handleSubmit={handleFormSubmit}
                  cancel={handleCancel}
                  onNameChange={handleNameChange}
                  onUserChange={handleUsername}
                  onEmailChange={handleEmailChange}
                  onAddressChange={handleCityChange}
                  Sub={`Edit`}
                  Can={"Cancel"}
                />
              ) : (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.username}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.address.city}</TableCell>
                  <TableCell align="center">
                    <button className="edit" onClick={() => handleEdit(row)}>
                      Edit
                    </button>
                  </TableCell>
                  <TableCell>
                    <button
                      className="delete"
                      onClick={() => handleDelete(row)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </>
  );
};

export default Tables;
