// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const token = localStorage.getItem("authToken");
// const Home = () => {
//   const [employees, setEmployees] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token) {
//       const fetchEmployees = async () => {
//         try {
//           // Retrieve the token from localStorage

//           console.log("token in home page", token);

//           // Send the request with the token in the headers
//           const response = await axios.get("http://localhost:3000/emp/getEmp", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           // Set the employees state with the data from the response
//           setEmployees(response.data.result);
//           console.log("emp details", response.data);
//         } catch (error) {
//           console.error("Error fetching employees:", error);
//           // Handle error, possibly redirect to login if token is invalid
//           navigate("/");
//         }
//       };

//       fetchEmployees();
//     } else {
//       alert("notoken");
//     }
//   }, []);
//   return (
//     <div>
//       <div>Home page</div>
//       <div>
//         <table class="table table-dark">
//           <thead>
//             <tr>
//               <th scope="col">Srl</th>
//               <th scope="col">Emp_name</th>
//               <th scope="col">Age</th>
//               <th scope="col">Salary</th>
//               <th scope="col">Address</th>
//             </tr>
//           </thead>
//           <tbody></tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Home;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const fetchEmployees = async () => {
        try {
          // Send the request with the token in the headers
          const response = await axios.get("http://localhost:3000/emp/getEmp", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Set the employees state with the data from the response
          setEmployees(response.data.result);
          console.log("emp details", response.data);
        } catch (error) {
          console.error("Error fetching employees:", error);
          // Handle error, possibly redirect to login if token is invalid
          navigate("/");
        }
      };

      fetchEmployees();
    } else {
      alert("No token found. Please log in.");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("authToken");

    // Optionally, you can also make a request to the server to invalidate the session
    axios
      .post("http://localhost:3000/logout")
      .then(() => {
        // Redirect to the login page after logout

        navigate("/login");
      })
      .catch((error) => {
        console.error("Error aftr during logout:", error);
        // Still redirect in case of error
        navigate("/login");
      });
  };

  return (
    <div>
      <div>Home page</div>
      <div>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Srl</th>
              <th scope="col">Emp_name</th>
              <th scope="col">Age</th>
              <th scope="col">Salary</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{emp.empname}</td>
                <td>{emp.age}</td>
                <td>{emp.salary}</td>
                <td>{emp.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
