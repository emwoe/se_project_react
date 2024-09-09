import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <div className="item-card__wrapper">
      <h2 className="item-card__title">{item.name}</h2>
      <img
        className="item-card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={() => {
          onCardClick(item);
        }}
      ></img>
    </div>
  );
}

export default ItemCard;
