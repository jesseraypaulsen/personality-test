// defer to Results.js for understanding

/*
Because localStorage stores key-value pairs, to store a javascript object we need to serialize it first:

  localStorage.setItem('user', JSON.stringify(user));

  Then to retrieve it from the store and convert to an object again:

  var user = JSON.parse(localStorage.getItem('user'));

  And to delete all entries:

  localStorage.clear();
  */
/* 
     {  domain
        title
        shortDescription
        description
        scoreText
        score
        count
        score
        facets: { facet, title, text, score, count, scoreText }
     }

     Each of the five result objects has a max score of 120 (24*5).
     Each has 24 questions, and each question has a max score of 5.
  */

//https://stackoverflow.com/a/8419509
export const getUserKeys = () => {
  let keys = [];
  for (let key in localStorage) {
    console.log(key);
    keys = keys.concat(key);
  }
  return keys;
};
