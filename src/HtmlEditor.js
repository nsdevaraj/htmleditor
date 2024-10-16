import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml"; // For HTML syntax highlighting

function HtmlEditor() {
  const defaultSamples = [
    "<h1>Hello World</h1>",
    "<p>This is a paragraph.</p>",
    "<div><span>Sample text</span></div>",
    "<ul><li>List item 1</li><li>List item 2</li></ul>",
    '<a href="https://example.com">Link</a>',
  ];

  const [code, setCode] = useState(defaultSamples[1]);

  useEffect(() => {
    setTimeout(() => {
      setCode(defaultSamples[0]);
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
