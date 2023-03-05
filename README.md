## Todos

**_The overall goal is mobile-friendly._**

- The 3 entrypoints:
  1. If all 120 scores are in the array, then redirect user to the Results Dashboard.
  2. If 0 scores are in the array, then call setSelectedItem with Question #1 from the inventory.
  3. Else, find the first unanswered question, then call setSelectedItem(firstUnansweredQuestion).
- https://stackoverflow.com/questions/64815012/why-does-react-router-not-works-at-vercel
- Results Dashboard
  - media query for mobile wrt BarChart
  - accordion -> users list

---

- <s>(change to consider): using dynamic parameterized views with React-Router eg /questionary/67 or /questionary/103.</s> The inventory order changes
  for each session, so this might mislead users into thinking that a question will persist at a given url.
- Someday/Maybe: change top bar to a small partial sidebar that expands/collapses at the press of a button.

---

## Done

- bug: generateFakeData stopped working as of the commit prior to last (still works at commit 8747eeb) <span style="color:green">✔</span>
- modal intro with prompt for profile name, but not if the user is returning from a prior session with data in localStorage. <span style="color:green">✔</span>
- a panel that shows all users, with buttons for loading and erasing. <span style="color:green">✔</span> (Results Dashboard)
- change 'generate data' button with fill function, into a form for username with a checkmark for fill. ie, you can generate data when you create a new user. <span style="color:green">✔</span> (Results Dashboard)
- Move "generate data" button onto the dashboard instead of the menu. <span style="color:green">✔</span> (Results Dashboard)
- remove items from the top bar <span style="color:green">✔</span> (removed title; moved one of the icons to Results Dashboard)
- deploy demo on cloud <span style="color:green">✔</span>

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
