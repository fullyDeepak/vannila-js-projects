const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const whatsappBtn = document.getElementById('whatsapp');
const newQuoteBtn = document.getElementById('new-quote');


//Quote API Call
async function getQuote() {
    const proxyURL = 'https://fullydeepak.github.io/vannila-js-projects/Quote-Generator/';
    const apiURL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
      const response = await fetch(proxyURL + apiURL);
      const data = await response.json();
      console.log(data);
      //If didn't fetch any author name
      if (data.quoteAuthor === ''){
        authorText.innerText = 'Ashneer Grover';
      }
      else{
        authorText.innerText = data.quoteAuthor;
      }
      //Will reduce the font size for larger text
      if (data.quoteText.length > 120){
        quoteText.classList.add('long-quote');
      }
      else{
        quoteText.classList.remove('long-quote');
      }
      quoteText.innerText = data.quoteText;
    } catch (error) {
      console.log("Bhari mistake ho gya, ekdm balunder ho gya", error);
    }
  }

//twitter button
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURl, '_blank');
}

//twitter button event listener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//whatsapp button
function whatsappQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const whatsappURl = `whatsapp://send?text=${quote} - ${author}`;
    window.open(whatsappURl, '_blank');
}

//whatsapp button event listener
whatsappBtn.addEventListener('click', whatsappQuote);
  
  //on page load
  getQuote();
  