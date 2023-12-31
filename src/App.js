import React, { useState } from 'react';


function App() {
  const [description, setDescription] = useState('');
  const [generatedReview, setGeneratedReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const modelId = 'gpt-3.5-turbo';
      const apiKey =process.env.API_URL;
      const apiUrl = 'https://api.openai.com/v1/chat/completions';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: description },
          ],
          max_tokens: 1000,
          model: modelId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setGeneratedReview(responseData.choices[0].message.content.trim());
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='app'>
      <h2>🕺 Bindaas Bot 🕺</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <textarea
          value={description}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter your query here..."
          rows="5"
          cols="50"
        ></textarea>
        <br />
        <button type="submit" disabled={!description || loading}>
          {loading ? 'Searching' : 'Searched Result'}
        </button>
      </form>
      <p className='saad'>Made by Saad Dastgir</p>
      {generatedReview && (
        <div>
          <h3>Searched Result:</h3>
          <p>{generatedReview}</p>
        </div>
      )}
    </div>
  );
}

export default App;
