import React from "react";
const BranGen: React.FC = () => {
  const [prompt, setPrompt] = React.useState("");
  const [snippet, setSnippet] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);
  const [hasResult, setHasResult] = React.useState(false);

  const ENDPOINT: string =
    "https://zoluoux2oe.execute-api.us-east-1.amazonaws.com/prod/generate_snippet_and_keywords";

  const onSubmit = () => {
    console.log("Submitting: " + prompt);
    fetch(`${ENDPOINT}?prompt=${prompt}`)
      .then((res) => res.json())
      .then(onResult);
  };

  const onResult = (data: any) => {
    setSnippet(data.snippet);
    setKeywords(data.keywords);
    setHasResult(true);
  };

  let resultsElement = null;

  if (hasResult) {
    resultsElement = (
      <div>
        Here are your results
        <div>
          Snippet: {snippet}
          Keywords: {keywords.join(", ")}
        </div>
      </div>
    );
  }

  return (
    <>
      <h1>BranGen</h1>
      <p>
        Tell me what your brand is about and I will generate brand snippets and
        marketing keywords for you
      </p>
      <input
        type="text"
        placeholder="coffee"
        value={prompt}
        onChange={(e) => setPrompt(e.currentTarget.value)}
      ></input>

      <button onClick={onSubmit}>Submit</button>
      {resultsElement}
    </>
  );
};

export default BranGen;
