
import "../styles/report.css"

export const Report = ({results}) => {
  return <div class="report">
    {results.map(r => <div>
      <h2 className={r.scoreText}>{r.title}</h2>
      <div>{r.scoreText}</div>
      <div>{r.text}</div>
      {/* Vertical Headings: https://stackoverflow.com/a/31408141 */}
      <table className="facets">{r.facets.map(f => <tr>
        <th>{f.title} </th> <td>{f.scoreText}</td>
      </tr>)}</table>
    </div>)}
  </div>
}

/*
export const Report = ({results}) => {
  return <div class="report">
    {results.map(r => <div>
      <div>domain: {r.domain}</div>
      <div>title: {r.title}</div>
      <div>shortDescription: {r.shortDescription}</div>
      <div>description: {r.description}</div>
      <div>scoreText: {r.scoreText}</div>
      <div>count: {r.count}</div>
      <div>text: {r.text}</div>
      <div>facets: {r.facets.map(f => <div>
        <div>facet: {f.facet}</div>
        <div>title: {f.title}</div>
        <div>text: {f.text}</div>
        <div>score: {f.score}</div>
        <div>count: {f.count}</div>
        <div>scoreText: {f.scoreText}</div>
      </div>)}</div>
    </div>)}
  </div>
}
*/