## Todos

- probably another navigation icon-button for going back to question-answering when you're on the dashboard, because currently you have to click on the inventory button and while that does take the user back to question-answering it also opens the Inventory Bar

- fix: vercel + react router -> https://stackoverflow.com/questions/64815012/why-does-react-router-not-works-at-vercel


### Notes on Application Logic

## use cases for the _Question_ entity

- answer a question
- skip a question (nextStep)
- go back to the previous question (backStep)
- change a previous answer (implicit) ??

### Important implementation details

For answering questions, when the user clicks a radio option, the handler updates the scores state and the localStorage entry for the current user.

For nextStep and backStep, the question is retrieved from inventory variable and assigned to selectedItem state. Then QuestionCard is updated because selectedItem is one of its props.

## use cases for the _User_ entity

- beginning of a new session. is the user returning from a previous session or is the user new?
- creating a user from the dashboard.
- loading a pre-existing user from the dashboard.

### Important implementation details

Beginning a new session: if localStorage has a "currentUser" key then setCurrentUser (in first useEffect) and setScores (in second useEffect). Or block further action with a modal until the user creates a name - at which point call setCurrentUser and setScores([]).
Each scenario must update both currentUser and scores states.
