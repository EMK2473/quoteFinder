document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("wordForm");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const inputText = document.getElementById("inputText").value;

    if (inputText.trim() !== "") {
      fetchDefinition(inputText);
    } else {
      resultDiv.textContent = "Please enter a word.";
    }
  });

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
        resultDiv.textContent =
          "An error occurred while fetching the definition.";
      });
  }

  function displayDefinition(data) {
    resultDiv.innerHTML = "";

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((definitionData, index) => {
        const partOfSpeech = definitionData.meanings[0].partOfSpeech;
        const definition = definitionData.meanings[0].definitions[0].definition;

        const definitionElement = document.createElement("div");
        definitionElement.innerHTML = `<strong>${partOfSpeech}:</strong> ${definition}`;
        resultDiv.appendChild(definitionElement);
        console.log("Data Object:", definitionData);
      });
    } else {
      resultDiv.textContent = "Definition not found.";
    }
  }
});
