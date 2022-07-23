export default function Results({ processResults, inventory, scores }) {
  const results = processResults(inventory, scores);
  console.log(JSON.stringify(results));
  /* title
     shortDescription
     description
     scoreText
     count
     score
     facets: facet, title, text, score, count, scoreText
  */
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid black",
        justifyContent: "space-between",
        maxWidth: "60em",
        marginTop: "3em",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "2em",
      }}
    >
      {results.map((result) => {
        return (
          <div key={result.title}>
            <div>Domain: {result.domain}</div>
            <div>
              Score: {result.score} ({result.scoreText})
            </div>
            <div>Count: {result.count}</div>
            <div>
              Facets:{" "}
              {result.facets.map((f) => (
                <div>
                  {f.title} - {f.score} ({f.scoreText})
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
