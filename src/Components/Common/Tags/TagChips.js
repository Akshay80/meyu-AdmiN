import React, {useState} from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

// import { Button, Col, FormGroup, Label, Input, Row } from "reactstrap";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
// import * as Yup from "yup";
// // import TagInput from "react-tagsinput";

const TagChips = () => {
  const [tagss, setTags] = useState([]);

  const handleChange = (tags) => {
    console.log(tags);
    setTags(tags);
  };


    return (
      <Formik
        initialValues={this.state}
        onSubmit={onSubmit}
        render={({
          values,
          errors,
          touched,
          status,
          dirty,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
          handleReset,
          setTouched,
          setFieldValue
        }) => (
          <Form onSubmit={handleSubmit} noValidate name="simpleForm">
            <TagsInput
              name="tags"
              value={values.tagss}
              onChange={tags => {
                console.log(tags);
                setFieldValue("tags", tags);
              }}
            />
          </Form>
        )}
      />
    );
}

export default TagChips