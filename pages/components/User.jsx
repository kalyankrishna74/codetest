import React, { useEffect, useState } from 'react';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from './globalStyles'
import { lightTheme, darkTheme } from "./theme";
import ErrorBoundary from './errorboundary';

function User() {
  const [theme, setTheme] = useState('light');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  const [user, setUser] = useState([]);

  useEffect(() => {
    const url = "https://reqres.in/api/users";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.data);
        setUser(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById('form')
    console.log(form.firstName.value);
    fetch('https://reqres.in/api/users', {
      method: 'POST',
      body: JSON.stringify({
        first_name: form.firstName.value,
        last_name: form.lastName.value,
        email: form.email.value,
        userId: Math.random().toString(36).slice(2),

      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((post) => {
        setUser((posts) => [post, ...posts]);
        setFirstName('');
        setLastName('');
        setEmail('');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  
  return (
    
<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div>
          <h2>user Data</h2>
          <button onClick={themeToggler}>Switch Theme</button>
          <table>
            <tr>
              <th>id</th>
              <th>profile</th>
              <th>first name</th>
              <th>Last name</th>
              <th>email</th>
            </tr>
            {
              user.map((data, index) => (
                <tr key={index}>
                  <td>{data.id}</td>
                  {/* <td><img src={data.avatar} alt="" /></td> */}
                  <td>2</td>
                  <td>{data.first_name}</td>
                  <td>{data.last_name}</td>
                  <td>{data.email}</td>
                </tr>
              ))
            }

          </table>
          <ErrorBoundary>
          <div style={{ marginTop: '15px' }}>
            <form onSubmit={handleSubmit} id='form'>
              <input type='text' placeholder='first name' name='firstName' required />
              <input type='text' placeholder='last name' name='lastName' required />
              <input type='email' placeholder='email' name='email' required />
              <button type='submit'>Add data</button>
            </form>
          </div>
          </ErrorBoundary>
          
        </div>
      </>

    </ThemeProvider>
  )
}

export default User