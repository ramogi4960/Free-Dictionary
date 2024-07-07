// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

const input_value = document.getElementById("input-value");
const search_button = document.getElementById("search-button");
const feedback = document.getElementById("feedback");

// define a function for what to do when search_button is clicked

search_button.addEventListener("click", (event) => {
    // first call the API to get the results of the input_value
    event.preventDefault();
    if (input_value.value === "") {alert("Enter a word to search"); return;}
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input_value.value}`).then(
        item => item.json().then(
            data => {
                console.log(data);
                // now render necessary items from data
                feedback.innerHTML = `
                <p>Search results for '${data[0].word}'</p>
                `;
                for (let item of data[0].meanings) {
                    let d = item.definitions.map(data => `<p>${data.definition}</p>`);
                    feedback.innerHTML += `
                    <div class="meaning">
                    <p>${item.partOfSpeech}</p>
                    ${d.join("")}
                    
                    </div>
                    `;
                }
            }
        )
    );

    // then place all necessary items into their respective HTML elements on DOM
});