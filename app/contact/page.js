"use client";

import { useState } from "react";
import { uploadFile } from "@/service/upload_service"; // Change path if needed
import { submit_issue } from "@/service/message_service";

export default function Contact() {
  const [file, setFile] = useState(null);

  const [subject , setSubject] = useState("");
  const [description, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // For file upload
    if (file){
      const response = await uploadFile(file);
      alert("Your issue has been submitted successfully!");
      console.log(response);
    }

    try{
      await submit_issue({subject,description})

      //Clear After submit
      setSubject("")
      setMessage("")
      alert("Your issue has been submitted successfully!");
    } catch (error) {
      alert("Please try again.");
      console.log(error);
    }
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h1>Contact & Support</h1>

      <p>
        Welcome to <strong>Entertainment24/7</strong>. If you encounter any
        issue while using our website, we're here to help.
      </p>

      <p>You can contact us by uploading:</p>

      <ul>
        <li>📷 Screenshot of the issue</li>
        <li>🎥 Screen recording or video</li>
        <li>📄 PDF explaining the problem</li>
      </ul>

      <p>
        Our team will review your submission and work to resolve the issue as
        quickly as possible.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <br />
          <br />
          <label>Subject: </label>
          <input type="text" placeholder="Subject of Issue" value={subject} onChange={(e) => setSubject(e.target.value)}
          style={{
              width: "100%",
              padding: "10px",
            }}/>
          <br />
          <label>
            <strong>Describe your issue:</strong>
          </label>
          <br />
          <br />
          <textarea
            rows="6"
            placeholder="Describe the issue you are facing..."
            value={description}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>
            <strong>Upload File</strong>
          </label>
          <br />
          <br />

          <input
            type="file"
            accept="image/*,video/*,.pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 25px",
            cursor: "pointer",
          }}
        >
          Submit Issue
        </button>
      </form>
    </div>
  );
}