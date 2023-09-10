import { useState } from 'react';

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Emanuel/twitter-emotion-deberta-v3-base",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  console.log(result[0][0].label);
  return result;
}

function EmotionAnalysisComponent() {
  const [textInput, setTextInput] = useState('');
  const [emotionResult, setEmotionResult] = useState(null);

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleEmotionAnalysis = async () => {
    if (textInput) {
      const result = await query({ "inputs": textInput });
      setEmotionResult(result);
    }
  };

  return (
    <div>
      <h1>Emotion Analysis</h1>
      <textarea
        placeholder="Enter text for emotion analysis"
        value={textInput}
        onChange={handleInputChange}
      />
      <button onClick={handleEmotionAnalysis}>Analyze</button>
      
      {emotionResult && (
        <div>
          <h2>Emotion Analysis Result</h2>
           <h3>Label: {emotionResult[0][0].label.toUpperCase()}</h3>
            <h3>Score: {Math.round(emotionResult[0][0].score*100)/100}</h3>
        <br/>

           <h3>Label: {emotionResult[0][1].label.toUpperCase()}</h3>
            <h3>Score: {Math.round(emotionResult[0][1].score*100)/100}</h3>
        <br/>

           <h3>Label: {emotionResult[0][2].label.toUpperCase()}</h3>
            <h3>Score: {Math.round(emotionResult[0][2].score*100)/100}</h3>
        <br/>

           <h3>Label: {emotionResult[0][3].label.toUpperCase()}</h3>
            <h3>Score: {Math.round(emotionResult[0][3].score*100)/100}</h3>
        <br/>
          
          {/* You can render a graph or visualization here for emotion analysis */}
        </div>
      )}
    </div>
  );
}

export default EmotionAnalysisComponent;
