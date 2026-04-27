class Deck {
    constructor(cardIds = null) {
        this.allCards = [];     // Основная колода (откуда берем карты)
        this.hand = [];         // Карты в руке
        this.discardPile = [];  // Сброс (использованные карты)
        this.handSize = 4;
        
        this.initDeck(cardIds);
        this.shuffle();
        this.drawInitialHand();
    }
    
    initDeck(cardIds) {
        const defaultCards = ['knight', 'archer', 'mage', 'knight', 'archer', 'mage', 'knight', 'archer'];
        const ids = cardIds || defaultCards;
        
        for (let id of ids) {
            const cardData = window.CONFIG.CARDS[id];
            if (cardData) {
                // Создаем новый экземпляр карты
                this.allCards.push(new Card(id, cardData));
            }
        }
    }
    
    shuffle() {
        for (let i = this.allCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.allCards[i], this.allCards[j]] = [this.allCards[j], this.allCards[i]];
        }
    }

    /**
     * Пополняет руку до handSize. 
     * Если колода пуста, замешивает сброс обратно в колоду.
     */
    refillHand() {
        while (this.hand.length < this.handSize) {
            // Если колода пуста, пробуем восстановить её из сброса
            if (this.allCards.length === 0) {
                if (this.discardPile.length === 0) break; // Карт больше нет совсем
                
                this.allCards = [...this.discardPile];
                this.discardPile = [];
                this.shuffle();
            }
            
            // Берем карту из начала колоды и кладем в руку
            this.hand.push(this.allCards.shift());
        }
    }

    drawInitialHand() {
        this.refillHand();
    }

    /**
     * Использует карту по индексу и СРАЗУ пополняет руку
     */
    useCard(index) {
        if (index < 0 || index >= this.hand.length) return false;
        
        // Извлекаем карту из руки
        const usedCard = this.hand.splice(index, 1)[0];
        
        // Отправляем её в сброс
        this.discardPile.push(usedCard);
        
        // Автоматически добираем новую карту
        this.refillHand();
        
        return true;
    }

    resetCycle() {
        this.allCards = [...this.allCards, ...this.hand, ...this.discardPile];
        this.hand = [];
        this.discardPile = [];
        this.shuffle();
        this.refillHand();
    }

    getCard(index) {
        return this.hand[index] || null;
    }
    
    getHand() {
        return this.hand;
    }
}
