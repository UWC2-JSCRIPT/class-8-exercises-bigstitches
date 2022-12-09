// using jquery don't forget to wrap!!
const formEl = document.getElementById('best-books-form');
const yearEl = document.getElementById('year');
const monthEl = document.getElementById('month');
const dateEl = document.getElementById('date');
const apiKey = 'e3zkkZ4GLV24HvlMQiXqcbex2gG74xk2';
// dog var to help parse
var dog = {};

formEl.addEventListener('submit', function(e) {
  e.preventDefault();

  const year = yearEl.value;
  const month = monthEl.value;
  const date = dateEl.value;
  //console.log(`${year}-${month}-${date}`);

  // Fetch bestselling books for date
  fetch(`https://api.nytimes.com/svc/books/v3/lists/${year}-${month}-${date}/hardcover-fiction.json?api-key=` + apiKey, {    
    method: 'get',  
  })  
  
  .then(response => { 
    return response.json(); 
    //console.log('you suck');
  })  
  .then(json => { 
    console.log(json); 
    // console.log('here worked');
    dog = json;
    parseDisplayBooks(json);
  });
  
});

function parseDisplayBooks (json) {
  // create an ordered list element to append the top 5 books
  const $ol = $('<ol>');
  $('#books-container').text('');
  
  // top 5 loop
  for (let i = 0; i < 5; i++) {
    //console.log(json.results.books[i]);
    //console.log(json.results.books[i].title);
    //console.log(json.results.books[i].author);
    
    // create all the elements, list/span/a 
    let $list = $('<li>');
    let $span = $('<span>');
    let $br = $('<br>');
    $span.text(`${json.results.books[i].title} by: ${json.results.books[i].author}`);
    let $img = $('<img>');
    //<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">
    
    $img.attr('src', json.results.books[i].book_image);
    $img.attr('alt', 'bestseller book hardcover');
    $img.attr('width', 180);
    $img.attr('height', 250);
    // a add image for extra credit

    // bundle the elements for style
    $list.append($span);
    $list.append($br);
    $list.append($img);

    //add to ordered list
    $ol.append($list);
    //console.log($list);
    //document.getElementById('books-container').append($list);
  }
  //console.log($ol);
  //document.getElementById('books-container').append($ol);
  //document.getElementById('books-container').append($ol);
  $('#books-container').append($ol);
}