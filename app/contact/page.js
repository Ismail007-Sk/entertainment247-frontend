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
    maxWidth: "900px",
    margin: "60px auto",
    padding: "40px",
    background: "#1c1c1c",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    color: "white",
  }}
>
  <h1
    style={{
      textAlign: "center",
      fontSize: "2.8rem",
      marginBottom: "25px",
      color: "#e50914",
    }}
  >
    📞 Contact & Support
  </h1>

  <p
    style={{
      fontSize: "1.1rem",
      lineHeight: "1.8",
      color: "#d8d8d8",
      textAlign: "center",
      marginBottom: "25px",
    }}
  >
    Welcome to <strong>Entertainment24/7</strong>. If you're experiencing any
    issue while using our platform, we're here to help. Submit your issue below,
    and our support team will review it as soon as possible.
  </p>

  <div
    style={{
      background: "#2a2a2a",
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "35px",
    }}
  >
    <h3
      style={{
        marginBottom: "15px",
        color: "#fff",
      }}
    >
      You can upload:
    </h3>

    <ul
      style={{
        lineHeight: "2",
        color: "#ccc",
        paddingLeft: "20px",
      }}
    >
      <li>📷 Screenshot of the issue</li>
      <li>🎥 Screen recording or video</li>
      <li>📄 PDF explaining the problem</li>
    </ul>
  </div>

  <form
    onSubmit={handleSubmit}
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "22px",
    }}
  >
    <div>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "600",
        }}
      >
        Subject
      </label>

      <input
        type="text"
        placeholder="Enter issue subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "8px",
          border: "1px solid #555",
          background: "#2a2a2a",
          color: "white",
          fontSize: "16px",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>

    <div>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "600",
        }}
      >
        Describe your issue
      </label>

      <textarea
        rows="7"
        placeholder="Describe the issue you're facing..."
        value={description}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "8px",
          border: "1px solid #555",
          background: "#2a2a2a",
          color: "white",
          fontSize: "16px",
          resize: "vertical",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>

    <div>
      <label
        style={{
          display: "block",
          marginBottom: "10px",
          fontWeight: "600",
        }}
      >
        Upload Supporting File
      </label>

      <input
        type="file"
        accept="image/*,video/*,.pdf"
        onChange={(e) => setFile(e.target.files[0])}
        style={{
          color: "#ccc",
        }}
      />

      <p
        style={{
          marginTop: "10px",
          fontSize: "14px",
          color: "#999",
        }}
      >
        Supported formats: Images, Videos and PDF documents.
      </p>
    </div>

    <button
      type="submit"
      style={{
        padding: "15px",
        border: "none",
        borderRadius: "8px",
        background: "#e50914",
        color: "white",
        fontSize: "17px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.3s",
      }}
    >
      Submit Issue
    </button>
  </form>
</div>
  );
}