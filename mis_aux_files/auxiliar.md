me dices que agregue esto:
// En el stock (card)
<SolitaireCard
  faceDown
  onClick={handleStockClick}
  isFlipping={flippingCard === 'stock-reset'}
/>
pero en el original ya está esto:
<SolitaireCard 
                faceDown 
                onClick={handleStockClick}
                isDealing={false}
              />
¿al final que hago isDealing va también o no?
