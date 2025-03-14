import HeartImg from '/ic_heart.png'
import DefaultImg from '/img_default.png'
import './ItemCard.css'

export const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <img className="item-img" width={221} height={221} src={item.images?.length? item.images[0] : DefaultImg} alt={item.nam || '상품이미지'} onError={(e) => e.target.src = DefaultImg} />
      <div className="item-info">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-price">{item.price.toLocaleString()}원</p>
        <div className="item-favorite">
          <img className='heart-img' src={HeartImg} />
          <p className='item-p'>{item.favoriteCount}</p>
        </div>
      </div>
    </div>   
  )
}