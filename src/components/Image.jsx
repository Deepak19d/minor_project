import { useState } from "react";


const API_TOKEN = "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";

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
      const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
        }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (<div className="container al-c mt-3">
      <h1>Stable <span>Diffusion</span></h1>
<p>Pellentesque vulputate dignissim enim, et sollicitudin massa pellentesque ut. Proin luctus dui ut sem varius eleifend.</p>
      <form className="gen-form" onSubmit={handleSubmit}>
        <input type="text" name="input" placeholder="type your prompt here..." />
        <button type="submit">Generate</button>
      </form>
      <div>
        {loading && <div className="loading">Loading...</div>}
        {!loading && output && (
      <div className="result-image">
            <img src={output} alt="art"  />
                </div>
)}
    </div>
  
    </div>);

};

export default ImageGenerationForm;