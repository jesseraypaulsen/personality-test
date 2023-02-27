## Todos

**_The overall goal is mobile-friendly._**

- Results Dashboard
  - change 'generate data' button with fill function, into a form for username with a checkmark for fill. ie, you can generate data when you create a new user.
  - media query for mobile wrt BarChart
  - modal intro with prompt for profile name, but if the user is returning from a prior session they have a different version of the modal that says "welcome so-and-so -- if this is the wrong profile change it in the dashboard." https://mui.com/material-ui/react-dialog/#form-dialogs
  - accordion on the Dashboard, for hiding/showing all users with buttons for switching to, or deleting.
  - dashboard -> <h1>{username}</h1> and then the bar chart. But under the title there's an arrow or something that you click to expand and see all users.

---

- two possibilities considered: 1) the ability to switch between localStorage and random dataset, 2) username keys mapped to arrays of answer objects, with some dummy usernames you can switch to, and one of the usernames is the current username in a selection menu on Results Dashboard above its corresponding BarChart. What is the difference between these two options? Which is more reasonable? Clearly the latter, because the former is semantically baffling.
- <s>Maybe -> change "generate data" button to a menu of profiles, with at least one dummy dataset.</s>
- <s>dashboard > saving your results in localStorage. then if you click "generate data" button, you can switch back to your saved results afterward.</s>
- Someday/Maybe: change top bar to a small partial sidebar that expands/collapses at the press of a button.

---

## Done

- Move "generate data" button onto the dashboard instead of the menu. <span style="color:green">✔</span> (Results Dashboard)
- remove items from the top bar <span style="color:green">✔</span> (removed title; moved one of the icons to Results Dashboard)
- deploy demo on cloud <span style="color:green">✔</span>
