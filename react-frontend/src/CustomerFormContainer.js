// Example usage in another component
import React, {useState, useEffect} from "react";
import MyForm from "./Form";
import axios from "axios";

const globleUrl = "http://localhost:8001/";

const CustomerFormContainer = (data) => {
  const [organizations, setOrganizations] = useState([]);
  const [initialValues, setInitialValues] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    organizationId: "",
    jobProfile: "",
    additionalInfo: "",
  });
  if (data.mode) {
    useEffect(() => {
      if (data.id > 0) {
        const fetchCustomer = async () => {
          try {
            const response = await axios.get(`${globleUrl}api/customers/${data.id}`);
            
            setInitialValues(response.data.data[0]);
          } catch (error) {
            console.error("Error fetching customer:", error);
          }
        };

        fetchCustomer();
      }
    }, [data.id]);
  }

  useEffect(() => {
    axios
      .get("http://localhost:8001/organizations")
      .then((response) => {
        setOrganizations(response.data);
      })
      .catch((error) => {
        console.log("Error fetching organizations:", error);
        // Provide a fallback dummy array
        const dummyOrganizations = [
          {
            id: 1,
            name: "Company 1",
            size: "25",
          },
          {
            id: 2,
            name: "Company 2",
            size: "35",
          },
          {
            id: 3,
            name: "Company 3",
            size: "45",
          },
        ];
        setOrganizations(dummyOrganizations);
      });
  }, []);

  // console.log(organizations);
  return <MyForm organizations={organizations} initialValues={initialValues} />;
};

export default CustomerFormContainer;
