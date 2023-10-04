// let quoteResult = document.getElementById("quoteResult");
// let submitCategoryButton = document.getElementById("submitCategory");
// let categorySelect = document.getElementById("categorySelect");
// let selectedCategory = categorySelect.value;
// let apiKey = "CqAY/Y5zxlIt8MM1Ia80ng==lzBAvIdejkytitBw";
// // let quoteText = result[0].quote;
// // let author = result[0].author;
// let form = document.getElementById("wordForm");
// let resultDiv = document.getElementById("result");
// let inputText = document.getElementById("inputText").value;
// let authorResult = document.getElementById("authorResult");
// let authorText = document.getElementById("authorText").value;
// let authorData = result[0];



// using two different fetch request formats for learning purposes



// display function/event listener/fetch api
function displayQuoteResult(quoteText, author) {
    let quoteResult = document.getElementById("quoteResult");
    quoteResult.innerHTML = `<strong>Quote:</strong> ${quoteText}<br><strong>Author:</strong> ${author}`;
  }
  let submitCategoryButton = document.getElementById("submitCategory");
  
  submitCategoryButton.addEventListener("click", function () {
    let categorySelect = document.getElementById("categorySelect");
    let selectedCategory = categorySelect.value;
    localStorage.setItem("selectedCategory", selectedCategory);

    // using variables for url and api key for fetch method

    let apiUrl =
      "https://api.api-ninjas.com/v1/quotes?category=" + selectedCategory;
    let apiKey = "CqAY/Y5zxlIt8MM1Ia80ng==lzBAvIdejkytitBw";
  
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((result) => {
        let quoteText = result[0].quote;
        let author = result[0].author;
        displayQuoteResult(quoteText, author);
        console.log(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  
  // DOMContentLoaded fires once the HTML doc has been COMPLETELY parsed; does not wait for asnycs.
  // "load" is only used to detect a fully loaded-page; DOMContentLoaded is appropriate here.


  // event listener/fetch api/display
  document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("wordForm");
    let resultDiv = document.getElementById("result");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      let inputText = document.getElementById("inputText").value;
      localStorage.setItem("inputText", inputText);
      if (inputText.trim() !== "") {
        fetchDefinition(inputText);
      } else {
        resultDiv.textContent = "Please enter a word.";
      }
    });
  

    // using function fetch url without variables method
    function fetchDefinition(word) {
      console.log("Input word:", word);
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
        method: "GET",
        credentials: "same-origin",
        redirect: "follow",
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(function (data) {
          displayDefinition(data);
        })
        .catch(function (error) {
          console.error("Error fetching definition:", error);
          resultDiv.textContent = "Check your spelling.";
        });
    }
  
    function displayDefinition(data) {
      resultDiv.innerHTML = "";
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((definitionData, index) => {
          let partOfSpeech = definitionData.meanings[0].partOfSpeech;
          let definition = definitionData.meanings[0].definitions[0].definition;
          let definitionElement = document.createElement("div");
          definitionElement.innerHTML = `<strong>${partOfSpeech}:</strong> ${definition}`;
          resultDiv.appendChild(definitionElement);
          console.log("Data Object:", definitionData);
        });
      } else {
        resultDiv.textContent = "Definition not found.";
      }
    }
  });
  


// display author/event listener/fetch api
  function displayAuthor(authorData) {
    let authorResult = document.getElementById("authorResult");
    authorResult.innerHTML = `
      <strong>Name:</strong> ${authorData.name}<br>
      <strong>Title:</strong> ${authorData.title}<br>
    `;
  }
  
  let submitAuthorButton = document.getElementById("authorForm");
  
  // event listener for author name submission
  submitAuthorButton.addEventListener("submit", function (event) {
    event.preventDefault();
    let authorText = document.getElementById("authorText").value;
    localStorage.setItem("authorText", authorText);
    let apiUrl = `https://api.api-ninjas.com/v1/historicalfigures?name=${authorText}`;
    let apiKey = "CqAY/Y5zxlIt8MM1Ia80ng==lzBAvIdejkytitBw";
  
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((result) => {
        if (result.length > 0) {
          let authorData = result[0];
          displayAuthor(authorData);
          console.log(result);
        } else {
          console.log("Author not found");
          authorResult.textContent = "Author not found. Double check your spelling.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  
  
  