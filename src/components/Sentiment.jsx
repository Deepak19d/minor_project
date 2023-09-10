import { useState } from 'react';

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
//   console.log(result[0][0].label);
  return result;
}

function SentimentAnalysisComponent() {
  const [textInput, setTextInput] = useState('');
  const [sentimentResult, setSentimentResult] = useState(null);

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSentimentAnalysis = async () => {
    if (textInput) {
      const result = await query({ "inputs": textInput });
      setSentimentResult(result);
    }
  };

  return (
    <div>
      <h1>Sentiment Analysis</h1>
      <textarea
        placeholder="Enter text for sentiment analysis"
        value={textInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSentimentAnalysis}>Analyze</button>
      
      {sentimentResult && (
        <div>
          <h2>Sentiment Score</h2>
          
{/* Negative Sentiment */}
        <h3>Label: {sentimentResult[0][0].label.toUpperCase()}</h3>
        <h3>Score: {Math.round(sentimentResult[0][0].score*100)/100}</h3>
        <br/>

{/* Neutral Sentiment */}

        <h3>Label: {sentimentResult[0][1].label.toUpperCase()}</h3>
        <h3>Score: {Math.round(sentimentResult[0][1].score*100)/100}</h3>
        <br/>

{/* Positive Sentiment */}
        <h3>Label: {sentimentResult[0][2].label.toUpperCase()}</h3>
        <h3>Score: {Math.round(sentimentResult[0][2].score*100)/100}</h3>
        <br/>
          
          {/* You can render a graph here using a charting library */}
        </div>
      )}
    </div>
  );
}

export default SentimentAnalysisComponent;
