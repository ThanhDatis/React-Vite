import React from 'react';
import image from '../assets/images/image.png'
import UserShow from './UserShow'

export default function HomePage() {
  const products = [
    {
      title: "Product Title Goes Here",
      brand: "BRAND",
      oldPrice: "OLD",
      newPrice: "NEW",
      discount: "DISCOUNT",
    },
    {
      title: "Product Title Goes Here",
      brand: "BRAND",
      oldPrice: "OLD",
      newPrice: "NEW",
      discount: "DISCOUNT",
    },
    {
      title: "Product Title Goes Here",
      brand: "BRAND",
      oldPrice: "OLD",
      newPrice: "NEW",
      discount: "DISCOUNT",
    },
    {
      title: "Product Title Goes Here",
      brand: "BRAND",
      oldPrice: "OLD",
      newPrice: "NEW",
      discount: "DISCOUNT",
    }
  ];

  const ProductCard = ({ product }) => (
    <div className="productItemCard">
      <div className="productImage">
        <img src={image} alt="Ảnh" />
      </div>
      <div className="productInfo">
        <div className="titleBrand">
          <h1 className="title">{product.title}</h1>
          <h3 className="brand">{product.brand}</h3>
        </div>
        <div className="priceAndDiscount">
          <span className="oldPrice">{product.oldPrice}</span>
          <span className="newPrice">{product.newPrice}</span>
          <p className="discount">{product.discount}</p>
        </div>
      </div>
    </div>
  );

  const ProductSection = ({ title, bannerDiscount, bannerText }) => (
    <section className="sectionProductShowCase">
      <div className="sectionProductHeader">
        <h2 className="sectionTitle">{title}</h2>
        <a className="sectionSeeAll" href="">See all</a>
      </div>
      <div className="sectionProductContainer">
        <div className="sectionGridItem" style={{ 
          gridTemplateColumns: 'repeat(4, 1fr)',
          width: '100%'
        }}>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

        <div className="sectionBanner">
          <div className="bannerImageContainer">
            <img src={image} alt="Banner" />
          </div>
          <div className="bannerContent">
            <div className="bannerText">
              <h2 className="bannerTitle">{bannerDiscount}</h2>
              <p className="bannerSubtitle">{bannerText}</p>
            </div>
            <button className="bannerButton">SHOP NOW</button>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="homepageContainer">
      <section className="sectionProductShowCase">
          <div className="sectionProductHeader">
              <h2 className="sectionTitle">NEW ARRIVALS</h2>
              <a className="sectionSeeAll" href="">See all</a>
          </div>
          <div className="sectionProductContainer">
              <div className="sectionProductGrid">
                  <div className="sectionGridImage">
                      <img src={image} alt="Ảnh" />
                      <button className="gridButton" href="">
                          SHOP NOW
                      </button>
                  </div>
                  <div className="sectionGridItem">
                      <ProductCard product={products[0]} />
                      <ProductCard product={products[1]} />
                  </div>
                  <div className="sectionGridItem">
                      <ProductCard product={products[2]} />
                      <ProductCard product={products[3]} />
                  </div>
                  <div className="sectionGridImage">
                      <img src={image} alt="Ảnh" />
                      <button className="gridButton" href="">
                          SHOP NOW
                      </button>
                  </div>
              </div>
          </div>
      </section>

      <ProductSection 
        title="NEW ARRIVALS" 
        bannerDiscount="50% OFF" 
        bannerText="On All Items" 
      />

      <ProductSection 
        title="TOP SELLERS" 
        bannerDiscount="35% OFF" 
        bannerText="All SKINCARE Items" 
      />
      <UserShow />
    </div>
  )
}
