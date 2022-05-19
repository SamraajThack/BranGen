interface ResultsProps {
  snippet: string;
  keywords: string[];
  prompt: string;
  onBack: any;
}

const Results: React.FC<ResultsProps> = (props) => {


  const keywordsElement = [];
  for (let i = 0; i < props.keywords.length; i++) {
    const element = <div key={i}>#{props.keywords[i]}</div>;
    keywordsElement.push(element)
  }

  return (
    <>
      <div>
        <div>
          <div>
            <b>Prompt: </b>
            {props.prompt}
          </div>
        </div>

        <div>
          <div>
            <b>Snippet</b>
          </div>
          <div>{props.snippet}</div>
        </div>

        <div>
          <div>
            <b>Keywords</b>
          </div>
          <div>{keywordsElement}</div>
        </div>
      </div>
      <button onClick={props.onBack}>Back</button>
    </>
  );
};

export default Results;
