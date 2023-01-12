const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const whatsappBtn = document.getElementById("whatsapp");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const shareBtn = document.getElementById("share-button");
const modal = document.getElementById("modal");
const copyBtn = document.getElementById("copy-button");
const fbBtn = document.getElementById("facebook");
const moreShare = document.getElementById("more-share");

function showLoadingSpinner() {
  loader.style.display = "block";
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.style.display = "none";
  }
}

//Quote API Call
async function getQuote() {
  showLoadingSpinner();
  const proxyURL = "https://corsproxy.io/?";
  const apiURL =
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyURL + apiURL);
    const data = await response.json();
    //If didn't fetch any author name
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    //Will reduce the font size for larger text
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
    throw new Error("Error occurred!");
  } catch (error) {}
}


//copy button event listener
// copyBtn.addEventListener('click', () => {
//   // let copyToClipboard = 
//   // navigator.clipboard.writeText(`${quoteText.innerText} - ${authorText.innerText}`);
//   navigator.clipboard.writeText(`Hemlo`);
//   navigator.vibrate(18);
// })

copyBtn.addEventListener('click', () => {
  let text = quoteText.textContent;
  let author = authorText.textContent;
  navigator.clipboard.writeText(`${text} ${author}`);
  alert(`Copied Quote by ${author}.`);
});


//twitter button
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", () => {
  const twitterURl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterURl, "_blank");
});


//fb button
fbBtn.addEventListener('click', () => {
  const fbURL = `https://www.facebook.com/share.php?u=${window.location.href}`;
  window.open(fbURL, "_blank");
})

//whatsapp button
whatsappBtn.addEventListener("click", () => {
  const whatsappURl = `https://wa.me/?text=${quoteText.innerText} - *${authorText.innerText}*`;
  window.open(whatsappURl, "_blank");
});


//more share
moreShare.addEventListener('click', () => {
  let text = quoteText.innerText + authorText.innerText;
  if (navigator.share){
    navigator.share({
      text:text
    })
  }else{
    alert('Not supported on Your device.')
  }
})

//show share modal
shareBtn.addEventListener('click', () => {
  modal.showModal();
})

//hide share modal
modal.addEventListener('click', () => {
  modal.close();
})

//on page load
getQuote();
