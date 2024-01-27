const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Loading spinner show
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Remove loading spinner
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API
async function getQuote() {
    showLoadingSpinner();
    //We need to use a Proxy URL to make our API call in order to avoid error
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);

        //If author is blank, add "Unknown"
        if (data.quoteAuthor === "") {
            authorText.innerText = "Unknown";
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        // reduce size for long quote
        if (data.quoteText.length > 120) {
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;

        //Stop loader, show quote
        removeLoadingSpinner();
        //throw new Error('oops');
    } catch (error) {
        getQuote();
        console.log('whoops, no quote', error);
    }
}

function tweetQuote() {
    console.log(1);
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

//Event listener twitter button
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load 
getQuote();
