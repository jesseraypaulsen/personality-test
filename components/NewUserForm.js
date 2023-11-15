export function NewUserForm({
  setNewUsername,
  newUsername,
  generate,
  setGenerate,
  setCurrentUser,
  userList,
  setUserList,
}) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ alignSelf: "flex-start" }}
    >
      <h2>Create a new user</h2>
      <div
        style={{
          // display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1em",
        }}
      >
        <input
          type="text"
          placeholder="type username here..."
          maxLength="25"
          onChange={(e) => setNewUsername(e.target.value)}
        ></input>
        <button
          onClick={() => {
            const testUsername = userList.find((key) => key === newUsername);

            if (testUsername) {
              alert("that name is already used");
              return;
            }
            if (newUsername) {
              setCurrentUser(newUsername);
              setUserList((prev) => [...prev, newUsername]);
            }
          }}
          style={{marginLeft: ".2em"}}
        >
          Create
        </button>
        <div style={{marginTop: ".5em"}}>
          <input
            type="checkbox"
            value={generate}
            name="generator"
            onChange={(e) => setGenerate(e.target.checked)}
          ></input>
          <label htmlFor="generator" style={{ fontSize: ".8em"}}>With Dummy Data</label>
        </div>
      </div>
    </form>
  );
}
