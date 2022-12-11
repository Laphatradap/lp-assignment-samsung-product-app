import styled from "styled-components";

export const Wrapper = styled.section`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
`;

export const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 10px;
  width: calc(20% - 20px);
  background-color: #f8f8f8;
  border-radius: 20px;

  img {
    max-height: 250px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
    width: 100%;
  }

  div {
    padding: 1rem;
  }
`;
