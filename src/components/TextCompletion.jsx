import { useState } from 'react';
import axios from 'axios';

const CompletionComponent = () => {
  const [inputText, setInputText] = useState('');
  const [completedText, setCompletedText] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const encodedParams = new URLSearchParams();
    encodedParams.set('text', inputText);

    const options = {
      method: 'POST',
      url: 'https://open-ai21.p.rapidapi.com/completion',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'd9bfad6ab8mshc6576d0a4c34a92p10e317jsnca8325b7f829',
        'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com',
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);

      if (response.data.generated_text) {
        setCompletedText(response.data.generated_text);
        console.log(response.data);
       
        setError(null);
      } else {
        setError('No completion found for the input.');
        console.log(response);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Text Completion</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter text:
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            required
          />
        </label>
        <button type="submit">Complete</button>
      </form>
      {completedText && (
        <div>
          <h2>Completed Text:</h2>
          <p>{completedText}</p>
        </div>
      )}
      {error && (
        <div>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CompletionComponent;
