getZenQuote();

async function getZenQuote() {
  try {
    const response = await fetch('https://type.fit/api/quotes');
    const data = await response.json();

    const randomNum = Math.floor(Math.random() * data.length);

    document.querySelector('.quotes-container').innerHTML = `
        <p class="quote">${data[randomNum].text}</p>
        <span class="quote-author">- ${data[randomNum].author}</span>`;
  } catch (error) {
    console.log(error);
  }
}
