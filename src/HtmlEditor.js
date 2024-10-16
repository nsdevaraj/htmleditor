import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml"; // For HTML syntax highlighting

function HtmlEditor() {
  const [defaultSamples, setDefaultSamples] = useState([]);
  const [code, setCode] = useState("");

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const files = [
          { path: "./samples/sample.xml", name: "Sample HTML" },
          { path: "./samples/valq.xml", name: "Valq" },
          {
            path: "./samples/reportingmatrix.xml",
            name: "Reporting Matrix",
          },
          {
            path: "./samples/writeback.xml",
            name: "Writeback Matrix",
          },
        ];

        const responses = await Promise.all(
          files.map((file) => fetch(file.path))
        );

        const texts = await Promise.all(
          responses.map((response) => response.text())
        );

        const samples = texts.map((text, index) => ({
          content: text,
          name: files[index].name,
        }));

        setDefaultSamples(samples);
        setCode(samples[0].content);
      } catch (error) {
        console.error("Error fetching samples:", error);
      }
    };

    fetchSamples();
    setTimeout(() => {
      setCode(defaultSamples[0]?.content || "");
      document.getElementById("sample-selector").options[0].selected = true;
      const element = document.getElementsByClassName("CodeMirror-scroll");
      element[0].style.display = "none";
      element[0].style.height = "0px";
      element[0].parentNode.style.height = "0px";
    }, 1000);
  }, []);

  return (
    <div>
      <select
        id="sample-selector"
        onChange={(e) => setCode(defaultSamples[e.target.value].content)}
      >
        {defaultSamples.map((sample, index) => (
          <option key={index} value={index}>
            {sample.name}
          </option>
        ))}
      </select>
      <CodeMirror
        value={code}
        options={{
          mode: "xml",
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
      />
      <div style={{ marginTop: "20px", border: "1px solid #ccc" }}>
        <iframe
          title="Preview"
          srcDoc={code}
          style={{ width: "100%", height: "300px", border: "none" }}
        />
      </div>
    </div>
  );
}

export default HtmlEditor;
