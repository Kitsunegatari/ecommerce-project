class CardDetail {
    constructor() {
        this.modal = document.getElementById('cardModal');
        this.closeBtn = document.getElementById('closeModal');
        this.backBtn = document.getElementById('backToCatalog');
        this.addToCartBtn = document.getElementById('addToCart');
        this.currentCard = null;

        this.initEventListeners();
    }

    /**
     * Inicializar event listeners
     */
    initEventListeners() {
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.backBtn.addEventListener('click', () => this.closeModal());
        this.addToCartBtn.addEventListener('click', () => this.addToCart());

        // Cerrar modal al hacer clic en el fondo
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Cerrar con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    /**
     * Mostrar modal con datos de la carta
     * @param {Object} cardData - Datos de la carta
     */
    displayCard(cardData) {
        this.currentCard = cardData;

        // Llenar información
        document.getElementById('cardImage').src = cardData.image || 'placeholder.png';
        document.getElementById('cardName').textContent = cardData.name || 'Sin nombre';
        document.getElementById('cardRarity').textContent = cardData.rarity || 'Común';
        document.getElementById('cardPrice').textContent = `$${parseFloat(cardData.price || 0).toFixed(2)}`;
        document.getElementById('cardDescription').textContent = cardData.description || 'Sin descripción';

        // Llenar habilidades
        const abilitiesList = document.getElementById('cardAbilities');
        abilitiesList.innerHTML = '';
        if (cardData.abilities && Array.isArray(cardData.abilities)) {
            cardData.abilities.forEach(ability => {
                const li = document.createElement('li');
                li.textContent = ability;
                abilitiesList.appendChild(li);
            });
        }

        // Llenar atributos técnicos
        document.getElementById('cardPower').textContent = cardData.power || 0;
        document.getElementById('cardDefense').textContent = cardData.defense || 0;
        document.getElementById('cardSpeed').textContent = cardData.speed || 0;

        // Mostrar modal
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Evitar scroll
    }

    /**
     * Cerrar modal
     */
    closeModal() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.currentCard = null;
    }

    /**
     * Agregar carta al carrito
     */
    addToCart() {
        if (!this.currentCard) return;

        console.log('Agregando al carrito:', this.currentCard);

        // Obtener carrito del localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Buscar si la carta ya está en el carrito
        const existingItem = cart.find(item => item.id === this.currentCard.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...this.currentCard,
                quantity: 1
            });
        }

        // Guardar carrito
        localStorage.setItem('cart', JSON.stringify(cart));

        // Mostrar confirmación
        alert(`✓ "${this.currentCard.name}" agregado al carrito`);
        this.closeModal();

        // Disparar evento personalizado
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.cardDetail = new CardDetail();
});

// Función pública para mostrar una carta (se llamará desde el catálogo)
window.showCardDetail = function(cardData) {
    if (window.cardDetail) {
        window.cardDetail.displayCard(cardData);
    }
};
