import "./ReviewList.css";

export const ReviewList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <ReviewListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const ReviewListItem = ({ item }) => {
  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <p>{item.rating}</p>

        <p>{item.content}</p>
      </div>
    </div>
  );
};
