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
        const responses = await Promise.all([
          fetch("./samples/valq.xml"),
          fetch("./samples/xviz.xml"),
        ]);

        const texts = await Promise.all(
          responses.map((response) => response.text())
        );
        setDefaultSamples(texts);
        setCode(texts[0]); // Set the initial code to the first sample
      } catch (error) {
        console.error("Error fetching samples:", error);
      }
    };

    fetchSamples();
  }, []);

  return (
    <div>
      <select
        id="sample-selector"
        onChange={(e) => setCode(defaultSamples[e.target.value])}
      >
        {defaultSamples.map((sample, index) => (
          <option key={index} value={index}>
            Sample {index + 1}
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
