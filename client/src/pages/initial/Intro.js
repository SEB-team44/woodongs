import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { useEffect } from "react";
export const Intro = (props) => {
  const { heading, subtitle, sub_heading, reverse, isButton, picture } =
    props.deliver;

  useEffect(() => {
    const h1_color = document.getElementById("colorVar1");
    const h2_color = document.getElementById("colorVar2");
    if (!subtitle) {
      h1_color.style.color = "#484848";
      h2_color.style.color = "#0049ee";
    }
  }, []);

  return (
    <HeaderStyled>
      <article
        className={
          reverse ? "header-container-reverse" : "header-container-row"
        }
      >
        <section className={reverse ? "header-box-reverse" : "header-box-row"}>
          <h1 id="colorVar1" className="heading">
            {heading}
          </h1>
          <h2 className="heading subtitle">{subtitle}</h2>
          <h2 id="colorVar2" className="sub-heading">
            {sub_heading}
          </h2>
          {isButton ? (
            <Link to={"/login"} className="link">
              <Button variant="contained">Get started!</Button>
            </Link>
          ) : null}
        </section>
        <section className="initial-picture">
          <img
            className="intro-img"
            src={require(`../../img/${picture}.png`)}
          />
        </section>
      </article>
    </HeaderStyled>
  );
};
const HeaderStyled = styled.div`
  .header-container-row {
    display: flex;
    flex-direction: row;
    padding: 40px, 20px, 40px, 60px;
  }

  .header-container-reverse {
    display: flex;
    flex-direction: row-reverse;
    padding: 40px, 60px, 40px, 20px;
  }
  .header-box-row {
    width: 40%;
    padding-right: 40px;
    transition: 0.8s;
  }
  .header-box-reverse {
    width: 40%;
    padding-left: 40px;
    transition: 0.8s;
  }

  .heading {
    font-size: 32px;
    font-weight: 700;
    color: #0049ee;
    margin-bottom: 10px;
    line-height: 1;
    margin-top: 30px;
    font: "Rodoto", sans-serif;
  }
  .subtitle {
    margin-top: 0px;
    margin-bottom: 35px;
    color: black;
  }
  .sub-heading {
    font-size: 26px;
    color: #484848;
    font-weight: 100;
    margin-bottom: 30px;
  }

  .initial-picture {
    text-align: center;
    width: 60%;
    padding-top: 20px;
    padding-bottom: 10%;
  }
  .intro-img {
    width: 95%;
    height: 100%;
    border-radius: 20px;
    border: 10px solid black;
  }
  @media (min-width: 1200px) {
    .initial-picture {
      text-align: center;
      padding-top: 20px;
      width: 760px;
      height: 500px;
    }
  }
  @media (max-width: 700px) {
    .header-container-row {
      display: flex;
      flex-direction: column;
    }
    .header-container-reverse {
      display: flex;
      flex-direction: column;
    }
    .header-box-row {
      width: 100%;
      text-align: left;
    }
    .header-box-reverse {
      width: 100%;
      text-align: left;
    }
    .initial-picture {
      width: 100%;
    }
  }
`;
