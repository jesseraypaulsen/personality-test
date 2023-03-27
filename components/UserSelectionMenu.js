import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

export function UserSelectionMenu({
  setCurrentUser,
  currentUser,
  userList,
  setUserList,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        gap: "1em",
        border: "1px solid black",
        padding: "1em",
      }}
    >
      <h2>All Users</h2>
      <div className="userlist">
        {userList.map((key) => (
          <div className={key === currentUser ? "active-user" : ""}>
            <span
              style={{
                minWidth: "30ch",
                //flex: "0 0 255px",
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
