import { useState } from 'react';
import axios from 'axios';
import isValidUrl from "../urlRegex.js"

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null)

  const handleCheckLinks = async () => {
    try {
      const checkUrlCorrect = isValidUrl(url)

      if (checkUrlCorrect) {
        setError(null)
        const response = await axios.get(`/api/checkLinks?url=${url}`);
        if (response.data.brokenLinks.length == 0) {
          setResult(["No broken Links found on Page"])
        }
        setResult(response.data.brokenLinks);
      } else {
        setError("please enter valid URL")
      }
    } catch (error) {
      console.error('Error checking links:', error);
      setResult(["Some error occurred"])
    }
  };


  return (
    <div>
      <h1>Broken Link Checker</h1> <br />
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleCheckLinks}>Check Links</button> <br />
      {error && <p> {error} </p>}

      {result && (
        <div> <br />
          <h2>Broken Links:</h2>
          <ul>
            {result?.map((link, index) => (
              <li key={index}>{(link)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
