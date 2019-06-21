
test('Login ao utilizador areias', async () => {
  const loginData = {
    username: "areias",
    hashPassword: "areias"
  };
  var status;

  const response = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    }).then(resp => status=resp.status);
  console.log(status)
  //  await response.json().then(resp => status=resp.status
  //   );
    expect(status).toBe(200)
  });