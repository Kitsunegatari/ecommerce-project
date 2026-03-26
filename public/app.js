// public/app.js

// Function to render the cards grid
function renderCardsGrid(cards) {
    const grid = document.getElementById('cardsGrid');
    grid.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `<h3>${card.title}</h3><p>${card.description}</p>`;
        cardElement.onclick = () => handleCardClick(card);
        grid.appendChild(cardElement);
    });
}

// Function to handle card clicks
function handleCardClick(card) {
    displayCardDetails(card);
}

// Function to display card details
function displayCardDetails(card) {
    const detailView = document.getElementById('detailView');
    detailView.innerHTML = `<h2>${card.title}</h2><p>${card.description}</p>`;
    // Add navigation options if needed
}

// Function to manage navigation between catalog and detail views
function showCatalogView() {
    document.getElementById('catalogView').style.display = 'block';
    document.getElementById('detailView').style.display = 'none';
}

function showDetailView() {
    document.getElementById('catalogView').style.display = 'none';
    document.getElementById('detailView').style.display = 'block';
}
