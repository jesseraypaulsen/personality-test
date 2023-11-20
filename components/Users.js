import { UserSelectionMenu } from "./UserSelectionMenu";
import { NewUserForm } from "./NewUserForm";
import { useState } from 'react'
import "../styles/users.css";


export default function Users ({ currentUser, setCurrentUser, userList, setUserList, generate, setGenerate }) {
  const [newUsername, setNewUsername] = useState(null);

  return <div className="user-operations-container">
        <UserSelectionMenu
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
          userList={userList}
          setUserList={setUserList}
        />
        <NewUserForm
          setNewUsername={setNewUsername}
          newUsername={newUsername}
          generate={generate}
          setGenerate={setGenerate}
          setCurrentUser={setCurrentUser}
          userList={userList}
          setUserList={setUserList}
        />
  </div>
} 
