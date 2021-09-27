const details = {
  grant_type: "client_credentials",
  client_id: "O1uPGrGX0LBt5tTYF6r4ivHvoRae68Fa",
  client_secret:
    "snJIf9EqQS770vCPs-1j88VD6Rp0L0h8FqqpdKQU0CbbSSAwOeTazDKDZgz1jI67",
  audience: "https://dev-98dsvvx8.us.auth0.com/api/v2/",
};
const formBody = [];
for (const property in details) {
  const encodedKey = encodeURIComponent(property);
  const encodedValue = encodeURIComponent(
    details[property as keyof typeof details]
  );
  formBody.push(encodedKey + "=" + encodedValue);
}
const body = formBody.join("&");

const getManagmentToken = async () => {
  const response = await fetch(
    "https://dev-98dsvvx8.us.auth0.com/oauth/token",
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body,
    }
  );

  const parsedResponse = await response.json();
  return parsedResponse;
};

export default getManagmentToken;
