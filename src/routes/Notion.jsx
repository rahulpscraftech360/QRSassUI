import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Notion = () => {
  const database_id = "f707a41655744ea5a5398f60c702a962";
  const [dbs, setDBS] = useState([]);
  const [accessToken, setToken] = useState();
  const OAuthclientID = "e15c62d1-13f5-4290-bd49-dd532ec71cb9";
  console.log("tokenAccess", accessToken);
  // When you open the app, this doesn't do anything, but after you sign into Notion, you'll be redirected back with a code at which point we call our backend.

  const userId = "65b24d030fc3376eea231a84";

  useEffect(() => {
    const params = new URL(window.document.location).searchParams;
    console.log(params);
    const code = params.get("code");
    console.log(code, "code>>>>>>>>>>");
    // if (!code) return;
    // fetch(`http://localhost:5000/v1/notion/login/${code}`).then(
    //   async (resp) => {
    //     const data = await resp.json();
    //     setDBS(data?.results);
    //     setToken(data?.access_token);
    //   }
    // );
    if (!code) return;
    // Replace getUserId() with your logic to get the user ID

    fetch(`http://localhost:5000/v1/notion/login/${code}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }), // Include the user ID in the request body
    }).then(async (resp) => {
      const data = await resp.json();
      setDBS(data?.results);
      setToken(data?.access_token);
    });
  }, []);
  console.log(dbs);
  return (
    <div>
      {" "}
      <div>
        <a
          style={{ display: "block" }}
          // href={`https://api.notion.com/v1/oauth/authorize?client_id=${OAuthclientID}&response_type=code&owner=user`}
          href={`https://api.notion.com/v1/oauth/authorize?client_id=e15c62d1-13f5-4290-bd49-dd532ec71cb9&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fsettings`}
        >
          Connect to Notion
        </a>
        {/* {dbs?.map((db) => (
          <div
            style={{
              display: "inline-flex",
              whiteSpace: "pre",
              border: "1px solid black",
              marginBottom: 10,
            }}
          >
            {JSON.stringify(db, null, 2)}
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Notion;
