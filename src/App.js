import React, { useState } from 'react';
import axios from 'axios';
import openai from 'openai'; // Make sure to install the 'openai' package

function App() {
  const [description, setDescription] = useState('');
  const [generatedReview, setGeneratedReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const modelId = 'gpt-3.5-turbo';
      const prompt = description;
      const maxTokens = 4096;
      const apiKey = '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'; 

      openai.ChatCompletion.create(
        {
          model: modelId,
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt },
          ],
          max_tokens: maxTokens,
        },
        { headers: { Authorization: `Bearer ${apiKey}` } }
      ).then((response) => {
        setGeneratedReview(response.data.choices[0].message.content.trim());
      });
    } catch (error) {
      console.error('Error generating review:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Review Generator</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={description}
          onChange={handleChange}
          placeholder="Enter your description details..."
          rows="5"
          cols="50"
        ></textarea>
        <br />
        <button type="submit" disabled={!description || loading}>
          {loading ? 'Generating...' : 'Generate Review'}
        </button>
      </form>
      {generatedReview && (
        <div>
          <h3>Generated Review:</h3>
          <p>{generatedReview}</p>
        </div>
      )}
    </div>
  );
}

export default App;
