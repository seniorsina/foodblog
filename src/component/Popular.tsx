import { useEffect, useState } from "react";
import { Recipes, Recipe } from "../Interfaces/RecipesInterface";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Popular = () => {
  ///----------
  const a = {} as Recipes;
  const [data = a, setData] = useState();
  useEffect(() => {
    GetPopular();
  }, []);

  const GetPopular = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
    );
    const data = await api.json();
    console.log(data);
    setData(data);
  };

  return (
    <div className="popular">
      {data.recipes && (
        <Wrapper>
          <h2>Popular Piks</h2>
          <Splide
            options={{
              perPage: 4,
              arrows: false,
              pagination: false,
              drag: "free",
              gap: "1rem",
            }}
          >
            {data?.recipes.map((Recipe, idx) => (
              <SplideSlide>
                <Card>
                  <p>{Recipe.title}</p>
                  <img src={Recipe.image} alt="" />
                  <Gradient></Gradient>
                </Card>
              </SplideSlide>
            ))}
          </Splide>
        </Wrapper>
      )}
    </div>
  );
};
const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 20rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
