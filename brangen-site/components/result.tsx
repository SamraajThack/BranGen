interface ResultsProps {
  snippet: string;
  keywords: string[];
  prompt: string;
  onBack: any;
}

const Results: React.FC<ResultsProps> = (props) => {
  const keywordsElement = [];
  for (let i = 0; i < props.keywords.length; i++) {
    const element = <div key={i} className="bg-teal-700 text-cyan-200 rounded-md px-2 text-sm">#{props.keywords[i]}</div>;
    keywordsElement.push(element);
  }

  const keywordElementHolder = <div className="flex flex-wrap gap-2">{keywordsElement}</div>

  const resultSection = (label: string, body: any) => {
    return (
      <div className="bg-slate-700 p-4 my-3 rounded-md">
        <div className="text-slate-400 font-bold mb-1">{label}</div>
        <div>{body}</div>
      </div>
    );
  };
  return (
    <>
      <div className="mb-6">
        
        <div>{resultSection("Prompt", <div className="text-lg font-bold">{props.prompt}</div>)}</div>
        <div>{resultSection("Branding Snippet", props.snippet)}</div>
        <div>{resultSection("Keywords", keywordElementHolder)}</div>{" "}
      </div>
      <button
        className="bg-gradient-to-r from-teal-400 to-blue-500 
      disabled:opacity-50 w-full p-2 rounded-md text-lg"
        onClick={props.onBack}
      >
        Back
      </button>
    </>
  );
};

export default Results;
