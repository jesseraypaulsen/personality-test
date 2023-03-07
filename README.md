## Todos

**_The overall goal is mobile-friendly._**

- beginTest (w/ 3 decision paths)

  - bug: useEffect -> always takes the first decision path; must execute only once; scores updated with empty array twice before it gets data
  - bug: findFirstUnansweredQuestion (third path - some answered, some not)

- https://stackoverflow.com/questions/64815012/why-does-react-router-not-works-at-vercel
- Results Dashboard
  - media query for mobile wrt BarChart
  - accordion -> users list
  - style that emphasizes transition between Questions -- currently it's hard to perceive the change.
  - probably another navigation icon-button for going back to quesion-answering when you're on the dashboard, because currently you have to click on the inventory button and while that does take the user back to question-answering it also opens the Inventory Bar

---

- <s>(change to consider): using dynamic parameterized views with React-Router eg /questionary/67 or /questionary/103.</s> The inventory order changes
  for each session, so this might mislead users into thinking that a question will persist at a given url.
- Someday/Maybe: change top bar to a small partial sidebar that expands/collapses at the press of a button.

---

## Additional Notes

Breaking down the application logic:

1. Using nextStep/backStep as a template... the question is retrieved from inventory variable, and then setSelectedItem(question). Then QuestionCard
   is updated because selectedItem is one of its props. In QuestionCard the user invokes updateItemScore(id,score) when selecting one of the radio options,
   which calls setScores. Whenever scores is updated then localStorage is updated with the new scores.
   In QuestionCard.js you find that updateItemScore depends on selectedItem. selectedItem is the inventory item (see nextStep/backStep). updateItemScore
   only takes the id from selectedItem. it will pair this id with a score when the user answers a question.

2. User account system. Three scenarios.
   - the first scenario is the initial loading scenario. it has two paths: if localStorage has a "currentUser" key then setCurrentUser (in first useEffect) and setScores (in second useEffect). or block further action with a modal until setCurrentUser is called.
   - the second scenario is creating a user from the dashboard. it also has two paths: generated data vs empty. it calls both setCurrentUser from handler and setScores in the 2nd useEffect.
   - the third scenario is loading a pre-existing user from the dashboard. As of now, it calls setCurrentUser from the handler and then depends on the setScores call in the second useEffect.
