import React, { useEffect } from "react";

import "./Lending.css";

import { useDispatch, useSelector } from "react-redux";
import { setIsRoomExist } from "../../redux/actions";

import Header from "../Header/Header";
import SmallBox from "../../shared/SmallBox/SmallBox";
import LargeBox from "../../shared/LargeBox/LargeBox";
import Footer from "../Footer/Footer";

import lendingStuding from "../../pictures/lending-studying.png";
import heartLending from "../../pictures/lending-heart.png";
import championLending from "../../pictures/lending-champion.png";
import phoneLending from "../../pictures/lending-phone.png";
import catLending from "../../pictures/lending-cat.png";
import hashLending from "../../pictures/lending-hash.png";
import greatLending from "../../pictures/lending-great.png";
import doodleLending from "../../pictures/lending-doodle.png";

function Lending() {
  const isRoomExist = useSelector((state) => state.isRoomExist);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isRoomExist) {
      dispatch(setIsRoomExist(false));
      //leave functionsality
    }
  }, []);
  return (
    <>
      <div className="lending">
        <Header />
        <div className="lending-container">
          <div className="large-and-small-box-wrapper">
            <LargeBox image={lendingStuding} imageDecoration={doodleLending} />
            <div className="small-box-wrapper">
              <SmallBox
                colNum={1}
                title="Having fun"
                color="#FBEC4F"
                image={heartLending}
                extraImage={hashLending}
              />
              <SmallBox
                colNum={2}
                title="Learn & play"
                color="#0DFDA7"
                image={championLending}
                extraImage={greatLending}
              />
              <SmallBox
                colNum={3}
                title="Talk with your friends"
                color="#FCD7F8"
                image={phoneLending}
                extraImage={catLending}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Lending;
