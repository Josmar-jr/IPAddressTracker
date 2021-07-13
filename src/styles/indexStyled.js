import styled from 'styled-components';

export const Container = styled.main`
  display: grid;
  grid-template-rows: 2.5fr 4fr;
  width: 100vw;
  height: 100vh;
  .leaflet-container {
    z-index: 100;
  }
`;

export const SearchSection = styled.main`
  width: 100%;
  height: 100%;
  background: url('/pattern-bg.png') no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  position: relative;

  h2 {
    font-size: 2.5rem;
    color: #fff;
    font-weight: 500;
    margin-top: ${(props) => (props.result ? '3rem' : '0')};
    margin-bottom: 2rem;
  }

  > div {
    display: flex;
    align-items: center;
    transition: 0.5s ease;
    margin-bottom: ${(props) => (props.results ? '-3rem' : '0')};

    input {
      border: none;
      padding: 1.3rem;
      font-size: 1.3rem;
      width: 35rem;
      border-radius: 1rem 0 0 1rem;
      color: var(--gray900);
      outline: none;

      &::placeholder {
        color: var(--gray700);
      }
    }

    button {
      background-color: #000;
      border: none;
      height: 100%;
      width: 4rem;
      border-radius: 0 1rem 1rem 0;

      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      transition: 0.5s ease;

      &:hover {
        background: var(--gray900);
      }

      &:disabled {
        background: var(--gray700);
      }
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.8rem;
      margin: 2rem 0;
    }

    > div {
      input {
        padding: 1rem;
        font-size: 0.9rem;
        width: calc(80vw - 4rem);
      }
    }
  }

  @media (max-width: 500px) {
    > div input {
      width: calc(90vw - 4rem);

      &::placeholder {
        font-size: 1.7rem;
      }
    }
  }
`;
export const SearchInfos = styled.main`
  background: #fff;
  bottom: -98px;
  border-radius: 1rem;
  z-index: 10;
  -webkit-box-sizing: 0px 7px 17px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 7px 17px 0px rgba(0, 0, 0, 0.2);

  animation: fadeUp 0.5s ease-in-out forwards;

  @media (max-width: 768px) {
    bottom: -165px;
    padding: 0;
  }
  @keyframes fadeUp {
    0% {
      transform: translateY(0px);
      opacity: 0;
    }
    100% {
      transform: translateY(110px);
      opacity: 1;
    }
  }

  ul {
    display: flex;
    padding: 2.5rem 4rem;
    justify-content: center;
    list-style: none;
    width: 80vw;

    strong {
      text-transform: uppercase;
      font-weight: 700;
      color: var(--gray700);
      font-size: 0.9rem;
      display: block;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.75rem;
      font-weight: 500;
      color: var(--gray900);
    }

    @media (max-width: 1280px) {
      width: 90vw;
      p {
        font-size: 1.5rem;
      }
    }

    li + li {
      margin-left: 3rem;
      position: relative;

      div {
        padding-left: 3rem;
      }

      &:before {
        content: '';

        display: inline-block;
        width: 2px;
        height: 75px;
        background: #cfcfcf;
        position: absolute;

        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 80vw;
      padding: 2rem;

      p {
        font-size: 1.5rem;
      }

      li + li {
        padding-top: 1.3rem;
        margin: 0;

        div {
          padding: 0;
        }

        &:before {
          display: none;
        }
      }
    }
  }

  @media (max-width: 500px) {
    width: 90vw;
    padding: 1.5rem;
  }
`;
export const MapContainer = styled.main`
  width: 100%;
  background: #ccc;

  pointer-events: ${({ loading }) => (loading ? 'none' : 'auto')};
  z-index: 1;

  .leaflet-top {
    top: initial;
    bottom: 1rem;
  }
`;
