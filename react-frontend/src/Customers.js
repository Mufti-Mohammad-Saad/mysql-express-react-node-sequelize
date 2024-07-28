import React, {useState, useEffect} from "react";
import {Panel, Image} from "react-bootstrap";
import CustomerDetails from "./CustomerDetails";
import CustomerFormContainer from "./CustomerFormContainer";
import axios from "axios";

const globleUrl = "http://localhost:8001/";

const Customers = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(1);
  const [customerList, setCustomerList] = useState(null);
  const [formState, setFormState] = useState(false);

  const [editingMode, setIsEditing] = useState(false);

  const updateEditing = (isEditted) => {
    // console.log(isEditted);
    setFormState(true);
    setIsEditing(isEditted);
  };

  const getCustomerData = async () => {
    try {
      const response = await axios.get("http://localhost:8001/api/customers");

      if (response.data && Array.isArray(response.data.data)) {
        console.log(response.data.data);
        setCustomerList(response.data.data); // Set the customer list with the data array
      } else {
        console.error("Unexpected response format:", response);
        setCustomerList([]);
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setCustomerList([]);
    }
  };

  const getConnectionWithBackend = async () => {
    await axios
      .get("http://localhost:8001/")
      .then((response) => {
        console.log("connected with backend");
      })
      .catch((error) => {
        console.error("Error connecting to backend:", error);
      });
  };
  // console.log(selectedCustomer);
  // Effect hook to fetch data when component mounts
  useEffect(() => {
    getCustomerData();
    getConnectionWithBackend();
  }, []); // Empty dependency array means this effect runs once on mount

  if (customerList === null) return <p>Loading data...</p>;

  return (
    <div className="addmargin">
      <div className="col-md-3">
        {customerList.length > 0 ? (
          customerList.map((customer) => (
            <Panel bsStyle="info" key={customer.id} className="Title panel">
              <Panel.Heading className="side-panel" onClick={() => setSelectedCustomer(customer.id)}>
                <Image className="profile-image" src={globleUrl + customer.imageUrl} roundedCircle />
                <Panel.Title componentClass="h3">{customer.name}</Panel.Title>
              </Panel.Heading>
            </Panel>
          ))
        ) : (
          <p>No customers available.</p>
        )}
      </div>
      <div className="col-md-6">
        <CustomerDetails isEditing={updateEditing} val={selectedCustomer} />
      </div>
      <div className="col-md-3">
        <h1 className="App-title">Form to Add New Customer</h1>
        <button onClick={() => setFormState(!formState)} className="btn btn-secondary mb-3">
          {formState ? "Hide Form" : "Show Form"}
        </button>
        {formState && <CustomerFormContainer id={selectedCustomer} mode={editingMode} />}
      </div>
    </div>
  );
};

export default Customers;
