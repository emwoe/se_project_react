import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <div>
      <h2>{item.name}</h2>
      <img src={item.link} alt={item.name}></img>
    </div>
  );
}

export default ItemCard;
