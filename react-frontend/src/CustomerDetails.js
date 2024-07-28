import React, {useState, useEffect} from "react";
import {Panel, Image, Row, Col, Button} from "react-bootstrap";
import axios from "axios";

const globleUrl = "http://localhost:8001/";
const CustomerDetails = ({val, isEditing}) => {
  const [customerDetails, setCustomerDetails] = useState(null);

  const deleteCustomer = async (id) => {
    if (id) {
      try {
        const response = await axios.delete(`http://localhost:8001/api/customers/${id}`);
        console.log("DELETE response:", response.data);
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  const getCustomerDetails = (id) => {
    axios
      .get(`http://localhost:8001/api/customers/${id}`)
      .then((response) => {
        setCustomerDetails(response.data.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching customer details:", error);
        setCustomerDetails(null); // Handle error by setting to null or as needed
      });
  };

  useEffect(() => {
    getCustomerDetails(val);
  }, [val]);

  if (!customerDetails) return <p>Loading Data...</p>;

  return (
    <div className="customerdetails">
      <Panel bsStyle="info" className="mb-5 centeralign ma">
        <Panel.Heading>
          <Panel.Title componentClass="h3">{customerDetails.name}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Row>
            <Col xs={12} style={{textAlign: "center"}}>
              <Image className="cover-image" src={globleUrl + customerDetails.imageUrl} rounded />
            </Col>
            <Col xs={12}>
              <p>Name : {customerDetails.name}</p>
              <p>Email : {customerDetails.email}</p>
              <p>Phone : {customerDetails.phone}</p>
              <p>City : {customerDetails.city}</p>
              <p>State : {customerDetails.state}</p>
              <p>Country : {customerDetails.country}</p>
              <p>Organization : {customerDetails.organization}</p>
              <p>Job Profile : {customerDetails.jobProfile}</p>
              <p>Additional Info : {customerDetails.additionalInfo}</p>
            </Col>
            <Col className="text-center" sm={6}>
              <Button
                onClick={() => {
                  isEditing(true);
                }}
                className="btn btn-info">
                {" "}
                Edit
              </Button>
            </Col>
            <Col className="text-center" sm={6}>
              <Button onClick={() => deleteCustomer(customerDetails.id)} className="btn btn-danger">
                Delete
              </Button>
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
    </div>
  );
};

export default CustomerDetails;
