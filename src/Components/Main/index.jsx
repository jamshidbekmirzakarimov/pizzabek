import React, { useContext, useEffect, useRef, useState } from "react";
import { API_PATH } from "../../utils";
import Card from "../Card";
import { Modal } from "antd";
import CloseIcon from "../../assets/icons/close.svg";
import { PizzaContext } from "../../context/barcha-pitsalar";
import Increment from "../../assets/icons/increment.svg";
import Decrement from "../../assets/icons/decrement.svg";

const Main = () => {
  const [data, setData] = useContext(PizzaContext);
  const btnRef = useRef();
  const [categorys, setCategorys] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (id) => {
    localStorage.setItem("id", id - 1);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch(API_PATH + "categorys")
      .then((response) => response.json())
      .then((data) => setCategorys(data))
      .catch((error) => console.log(error));
  }, []);

  const sortByCategorys = (key, index) => {
    const classNamecha = document.getElementsByClassName("barchasi");
    categorys.forEach((_, ind) => {
      ind === index
        ? classNamecha[ind].classList.add("active")
        : classNamecha[ind].classList.remove("active");
    });
    fetch(API_PATH + key)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  };
  const onePizza = data[localStorage.getItem("id")];
  console.log(onePizza);

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  let sum = onePizza?.price * { count };
  console.log(sum); 
  return (
    <div>
      <Modal className="modalStyle" open={isModalOpen} onCancel={handleCancel}>
        <div>
          <div className="close-box">
            <img
              onClick={handleCancel}
              src={CloseIcon}
              alt=""
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="modalni-biri">
            <div className="img-boxx">
              <img src={onePizza?.image} alt="" />
            </div>
            <div className="modalni-ikkisi">
              <h2>{onePizza?.title}</h2>
              <p className="onePizzaDesc">{onePizza?.description}</p>
              <h4 className="big_pizza">Pitsa kattaligi</h4>
              <div className="inc_dec_pizza">
                <button onClick={increment} className="incremen">
                  <img src={Increment} alt="" />
                </button>
                <p className="count-title">{count} - ta</p>
                <button onClick={decrement} className="incremen">
                  <img src={Decrement} alt="" />
                </button>
              </div>
              <div className="inc_dec_pizza">
                {onePizza?.xamir.map((valuee) => (
                  <button className="pizza-xamir">{valuee}</button>
                ))}
              </div>
              <>
                <div className="price-box">
                  <p>{sum}</p>
                <button onClick={handleOk}>Savatchaga qoshish</button>
                </div>
              </>
            </div>
          </div>
        </div>
      </Modal>
      <section className="hero-secion">
        <div className="hero-wrapper container main-box">
          <div className="top-top-box">
            {categorys &&
              categorys?.map((category, index) => (
                <button
                  ref={btnRef}
                  key={index}
                  onClick={() => sortByCategorys(category.key, index)}
                  className="barchasi"
                >
                  {category?.title}
                </button>
              ))}
          </div>
          <h1 className="main-title">Barcha pitsalar</h1>
          <div className="top-box">
            {data &&
              data.map((valu, index) => (
                <Card onClick={showModal} key={index} valu={valu} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
