import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../../state/axios-instance.js";
import { Editor } from "@tinymce/tinymce-react";
import ImageUploader from "react-images-upload";

const ReportModal = ({ selectedBillboard, ...props }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reportType, setReportType] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [images, setImages] = useState([]);

  const handleEditorChange = (content, editor) => {
    setReportContent(content);
  };

  const onDrop = (pictureFiles, pictureDataURLs) => {
    if (pictureFiles.length > 2) {
      alert("You can only upload a maximum of 2 images");
      return;
    }
    setImages(pictureFiles);
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const report = {
      name,
      email,
      phone,
      reportContent,
      images,
    };

    console.log(report);

    // try {
    //   const response = await axios.post("/api/reports", report);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Report Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedBillboard && (
          <div>
            <Form className="w-100">
              {/* Name */}
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="w-75"
                  type="text"
                  placeholder="Tên của bạn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              {/* EMail */}
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="w-75"
                  type="email"
                  placeholder="Email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              {/* SĐT */}
              <Form.Group controlId="formPhone">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  className="w-75"
                  type="tel"
                  placeholder="Số điện thoại của bạn"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>

              {/* Report Type */}
              <Form.Group className="mb-3" controlId="formReportType">
                <Form.Label>Hình thức báo cáo</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option>Chọn hình thức</option>
                  <option value="Tố giác sai phạm">Tố giác sai phạm</option>
                  <option value="Đăng ký nội dung">Đăng ký nội dung</option>
                  <option value="Đóng góp ý kiến">Đóng góp ý kiến</option>
                  <option value="Giải đáp thắc mắc">Giải đáp thắc mắc</option>
                </Form.Select>
              </Form.Group>

              {/* Report Content */}
              <Form.Group controlId="formReportContent">
                <Form.Label>Nội dung báo cáo</Form.Label>
                <Editor
                  apiKey="iyxstxm8n9v0pliauo4v84fc5hcukiihgtsjoeguttjxi6sf"
                  initialValue="Welcome to TinyMCE!"
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help",
                  }}
                  onEditorChange={handleEditorChange}
                />
              </Form.Group>

              {/* Images */}
              <Form.Group controlId="formImages">
                <Form.Label>Images</Form.Label>
                <ImageUploader
                  withIcon={true}
                  buttonText="Choose images"
                  onChange={onDrop}
                  imgExtension={[".jpg", ".png"]}
                  maxFileSize={5242880}
                  maxFileCount={2}
                />
                {images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="User chosen"
                      style={{ width: "100px", height: "100px" }}
                    />
                    <button onClick={() => handleDeleteImage(index)}>
                      Delete
                    </button>
                  </div>
                ))}
              </Form.Group>
            </Form>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReportModal;
