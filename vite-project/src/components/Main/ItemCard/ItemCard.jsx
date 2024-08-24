import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <div className="item-card__wrapper">
      <h2 className="item-card__title">{item.name}</h2>
      <img className="item-card__image" src={item.link} alt={item.name}></img>
    </div>
  );
}

export default ItemCard;
