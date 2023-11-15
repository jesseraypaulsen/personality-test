import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

export function UserSelectionMenu({
  setCurrentUser,
  currentUser,
  userList,
  setUserList,
}) {
  return (
    <div className="userlist-container">
      <h2>All Users</h2>
      <div className="userlist">
        {userList.map((key, i) => (
          <div className={key === currentUser ? "active-user" : "idle-user"} key={i}>
            <span
              style={{
                minWidth: "25ch",
                display: "flex",
                alignItems: "center",
                paddingLeft: "1em",
              }}
            >
              {key}
            </span>
            <span
              disabled={key === currentUser}
              className="userlist-button"
              onClick={(e) => setCurrentUser(key)}
            >
              <SwapHorizIcon />
              {/*Load*/}
            </span>{" "}
            <span
              disabled={key === currentUser}
              className="userlist-button"
              onClick={(e) => {
                localStorage.removeItem(key);
                setUserList((prev) => [...prev.filter((user) => user !== key)]);
              }}
            >
              <PersonRemoveIcon />
              {/* Erase */}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
