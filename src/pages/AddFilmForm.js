import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/style.css";
import Images from "../assets/Icons/icons";
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";

const style = {
  textArea: {
    height: "100px",
    resize: "none",
  },
};

const AddFilm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [preview, setPreview] = useState(null); // preview foto
  const [message, setMessage] = useState("");

  const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.data);
      console.log("INI OKE", response);
    } catch (err) {
      console.log(err);
    }
  };

  const [form, setForm] = useState({
    title: "",
    thumbnailfilm: "",
    year: "",
    linkfilm: "",
    description: "",
    category_id: "",
  });

  const handleChange = (event) => {
    // console.log("Name: ", event.target.name);
    // console.log("Value: ", event.target.value);
    setForm({
      ...form,
      [event.target.name]:
        event.target.type === "file" ? event.target.files : event.target.value,
    });

    if (event.type === "file") {
      let url = URL.createObjectURL(event.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (event) => {
    try {
      event.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      const formData = new FormData();
      formData.set("title", form?.title);
      formData.set("description", form?.description);
      formData.set("year", form?.year);
      formData.set("linkfilm", form?.linkfilm);
      formData.set("category_id", form?.category_id);
      formData.set("image", form.thumbnailfilm[0], form.thumbnailfilm[0].name);

      console.log("CategoiryId: ", form.category_id);

      const response = await API.post("/film", formData, config);
      console.log("IKI RESEKPON 2", response);

      navigate("/add-film-list");

      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="formContainer ps-5 pe-5 pt-2">
        <h4 className="addFilmTitle text-white mt-3 mb-4">Add Film</h4>
        <Form
          onSubmit={(event) => handleSubmit.mutate(event)}
          className="ms-5 me-5 mb-5 mt-3 ps-5 pe-5 filmForm"
        >
          <fieldset>
            <Form.Group className="mb-2 d-flex">
              <Form.Control
                onChange={handleChange}
                placeholder="Title"
                className="me-2"
                name="title"
                disable
              />
              <Form.Label className="input-img d-flex justify-content-between">
                <p>
                  <span>Attach Thumbnail</span>
                </p>
                <Form.Control
                  placeholder="Attach Thumbnail"
                  className="addTitle ps-4"
                  onChange={handleChange}
                  name="thumbnailfilm"
                  type="file"
                  hidden
                />
                <img src={Images.PaperClip} alt="" className="uploadIcon" />
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Year"
                name="year"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select name="category_id" onChange={handleChange}>
                <option hidden>Category</option>
                <option value="1">Movies</option>
                <option value="2">TV Series</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                name="description"
                style={style.textArea}
                onChange={handleChange}
                placeholder="Description"
                className=" description text-white"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Link Film"
                name="linkfilm"
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button type="submit" className="btn btn-danger ps-5 pe-5">
                Save
              </Button>
            </div>
          </fieldset>
        </Form>
      </div>
    </>
  );
};

export default AddFilm;
