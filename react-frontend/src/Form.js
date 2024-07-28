import React, {useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";
import placeHolderImage from "./placeeholder.png";

const MyForm = ({organizations, initialValues}) => {

  var image = placeHolderImage;
  console.log(initialValues.imageUrl);
  if (initialValues.imageUrl) {
    image = 'http://localhost:8001/'+initialValues.imageUrl;
  }

  const [previewImage, setPreviewImage] = useState(image);
  const validationSchema = Yup.object({
    id: Yup.number().default(0),
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    phone: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    organizationId: Yup.number().required("Required"),
    jobProfile: Yup.string().required("Required"),
    additionalInfo: Yup.string(),
    file: Yup.mixed(),
  });

  const onSubmit = async (values, {setSubmitting, setErrors}) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    try {
      if (formData.id == 0) {
        console.log("POST");
        const response = await axios.post("http://localhost:8001/api/customers", formData, {
          headers: {"Content-Type": "multipart/form-data"},
        });
      }else{
        const response = await axios.put(`http://localhost:8001/api/customers/${values.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("POST");
      }
      console.log("Form submitted successfully", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({submit: "Failed to submit form. Please try again."});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={onSubmit}>
      {({setFieldValue, isSubmitting, errors}) => (
        <Form encType="multipart/form-data">
          <div className="form-group">
            <Field name="id" type="hidden" className="form-control" />
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="file">Upload File</label>
            <br />
            <div style={{position: "relative", display: "inline-block"}}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => document.getElementById("fileInput").click()}>
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{width: "100px", height: "100px"}}
                />
              </button>
              <input
                id="fileInput"
                name="file"
                type="file"
                style={{display: "none"}}
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("file", file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPreviewImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                  } else {
                    setPreviewImage(null);
                  }
                }}
              />
            </div>
            <ErrorMessage name="file" component="div" className="text-danger" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <Field name="phone" type="text" className="form-control" />
            <ErrorMessage name="phone" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <Field name="city" type="text" className="form-control" />
            <ErrorMessage name="city" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <Field name="state" type="text" className="form-control" />
            <ErrorMessage name="state" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <Field name="country" type="text" className="form-control" />
            <ErrorMessage name="country" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="organizationId">Organization</label>
            <Field as="select" name="organizationId" className="form-control">
              <option value="" label="Select organization" />
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="organizationId" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="jobProfile">Job Profile</label>
            <Field name="jobProfile" type="text" className="form-control" />
            <ErrorMessage name="jobProfile" component="div" className="text-danger" />
          </div>

          <div className="form-group">
            <label htmlFor="additionalInfo">Additional Info</label>
            <Field as="textarea" name="additionalInfo" className="form-control" />
            <ErrorMessage name="additionalInfo" component="div" className="text-danger" />
          </div>

          {errors.submit && <div className="text-danger">{errors.submit}</div>}

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
