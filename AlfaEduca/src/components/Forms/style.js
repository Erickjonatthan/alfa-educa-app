import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:wght@300;400;700&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Open Sans', sans-serif;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(0, 0, 0);
`;

export const Content = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  width: 960px;
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    background-color: rgb(78, 2, 76);
    width: 40%;
    height: 100%;
    border-bottom-left-radius: 15px;
    border-top-left-radius: 15px;
    left: 0%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 55%;
  text-align: center;
`;

export const Input = styled.input`
  height: 45px;
  border: none;
  width: 100%;
  background-color: #ecf0f1;
`;

export const LabelInput = styled.div`
  background-color: #ecf0f1;
  display: flex;
  align-items: center;
  margin: 8px;
`;

export const IconModify = styled.span`
  color: rgb(187, 180, 187);
  padding: 0 5px;
`;

export const Button = styled.button`
  border-radius: 15px;
  text-transform: uppercase;
  color: white;
  font-size: 10px;
  padding: 10px 50px;
  cursor: pointer;
  font-weight: bold;
  width: 150px;
  align-self: center;
  border: none;
  margin-top: 1rem;
`;

export const ButtonPrimary = styled(Button)`
  background-color: transparent;
  border: 1px solid white;
  transition: background-color 0.5s;

  &:hover {
    background-color: rgb(246, 246, 246);
    color: rgb(78, 2, 76);
  }
`;

export const ButtonSecond = styled(Button)`
  background-color: rgb(78, 2, 76);
  border: 1px solid rgb(78, 2, 76);
  transition: background-color 0.5s;

  &:hover {
    background-color: rgb(255, 255, 255);
    color: rgb(78, 2, 76);
    border: 1px solid rgb(78, 2, 76);
  }
`;

export const Title = styled.h2`
  font-weight: bold;
  font-size: 28px;
  text-transform: capitalize;
`;

export const TitlePrimary = styled(Title)`
  color: rgb(255, 255, 255);
`;

export const TitleSecond = styled(Title)`
  color: rgb(78, 2, 76);
`;

export const Description = styled.p`
  font-size: 14px;
  font-weight: 300;
  line-height: 30px;
`;

export const DescriptionPrimary = styled(Description)`
  color: white;
`;

export const DescriptionSecond = styled(Description)`
  color: rgb(203, 194, 194);
`;

export const PrimeiroConteudo = styled.div`
  display: flex;
`;

export const SegundaColuna = styled.div`
  z-index: 12;
`;

export const PrimeiraColuna = styled.div`
  text-align: center;
  width: 40%;
  z-index: 10;
`;

export const SegundaColunaFlex = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MidiaSocial = styled.div`
  margin: 1rem 0;
`;

export const LinkMidiaSocial = styled.a`
  &:not(:first-child) {
    margin-left: 10px;
  }

  .item_midia_social {
    transition: background-color 0.5s;
  }

  &:hover .item_midia_social {
    background-color: rgb(78, 2, 76);
    color: white;
    border-color: rgb(78, 2, 76);
  }
`;

export const ListMidiaSocial = styled.ul`
  display: flex;
  list-style-type: none;
`;

export const ItemMidiaSocial = styled.li`
  border: 1px solid rgb(199, 192, 192);
  border-radius: 50%;
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: rgb(147, 142, 142);
`;

export const SegundoConteudo = styled.div`
  position: absolute;
  display: flex;

  .primeira_coluna {
    order: 2;
    z-index: -1;
  }

  .segunda_coluna {
    order: 1;
    z-index: -1;
  }
`;

export const Senha = styled.p`
  color: rgb(55, 52, 55);
  font-size: 14px;
  margin: 15px 0;
  text-align: center;

  &::first-letter {
    text-transform: capitalize;
  }
`;

export const EntrarJs = styled.div`
  .primeiro_conteudo .primeira_coluna {
    z-index: -1;
  }

  .segundo_conteudo .segunda_coluna {
    z-index: 11;
  }

  .segundo_conteudo .primeira_coluna {
    z-index: 13;
  }

  .conteudo::before {
    left: 60%;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    animation: slidein 0.8s;
    z-index: 12;
  }
`;

export const CadastrarJs = styled.div`
  .conteudo::before {
    animation: slideout 0.8s;
    z-index: 12;
  }

  .segundo_conteudo .primeira_coluna,
  .segundo_conteudo .segunda_coluna {
    z-index: -1;
  }

  .primeiro_conteudo .segunda_coluna {
    z-index: 11;
  }

  .primeiro_conteudo .primeira_coluna {
    z-index: 13;
  }

  .primeiro_conteudo .segunda_coluna {
    z-index: -1;
    position: relative;
    animation: deslocamentoEsq 0.8s;
  }

  .segundo_conteudo .segunda_coluna {
    z-index: -1;
    position: relative;
    animation: deslocamentoDir 0.8s;
  }
`;

export const Keyframes = createGlobalStyle`
  @keyframes deslocamentoEsq {
    from {
      left: 0;
      opacity: 1;
      z-index: 12;
    }
    25% {
      left: -80px;
      opacity: 0.5;
    }
    50% {
      left: -100px;
      opacity: 0.2;
    }
    to {
      left: -110px;
      opacity: 0;
      z-index: -1;
    }
  }

  @keyframes deslocamentoDir {
    from {
      left: 0;
      z-index: 12;
    }
    25% {
      left: 80px;
    }
    50% {
      left: 100px;
    }
    to {
      left: 110px;
      z-index: -1;
    }
  }

  @keyframes slidein {
    from {
      left: 0;
      width: 40%;
    }
    25% {
      left: 5%;
      width: 50%;
    }
    50% {
      left: 25%;
      width: 60%;
    }
    75% {
      left: 45%;
      width: 50%;
    }
    to {
      left: 60%;
      width: 40%;
    }
  }

  @keyframes slideout {
    from {
      left: 60%;
      width: 40%;
    }
    25% {
      left: 45%;
      width: 50%;
    }
    50% {
      left: 25%;
      width: 60%;
    }
    75% {
      left: 5%;
      width: 50%;
    }
    to {
      left: 0;
      width: 40%;
    }
  }
`;