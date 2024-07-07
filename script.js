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
                console.log(data)
                // if the word doesn't exist in the dictionary
                if (data.message !== undefined) {
                    feedback.innerHTML = `
                    <p>${data.message}</p>
                    `;
                }
                // now render necessary items from data
                else {
                    // then place all necessary items into their respective HTML elements on DOM
                    feedback.innerHTML = `
                <p>Search results for '${data[0].word}'</p>
                `;
                for (let item of data[0].meanings) {
                    let d = item.definitions.map(data => {
                        let x = `<li>${data.definition}`;
                        if (data.example) {
                            x += `<br><span class="example">"${data.example}"</span>`;
                        }
                        if (data.synonyms.length !== 0) {
                            x += `<br><span class="synonyms">synonyms: ${data.synonyms.join(", ")}</span>`
                        }
                        return x + `</li>`;
                    });

                    feedback.innerHTML += `
                    <div class="meaning">
                    <p class="partOfSpeech">${item.partOfSpeech}</p>
                    <ul>
                    ${d.join("")}
                    </ul>
                    </div>
                    `;
                }
                }
            }
        )
    );
});