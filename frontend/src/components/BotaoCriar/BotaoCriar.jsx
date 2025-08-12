import React from 'react';
import styled from 'styled-components';

const Button = ({ funcao }) => {
  return (
    <StyledWrapper>
      <button onClick={funcao}>
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4 5a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 1 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 1 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H4Z" />
        </svg>
        <span>Enviar Chamado</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: inherit;
    cursor: pointer;
    font-weight: 500;
    font-size: 17px;
    padding: 0.5em 0.5em;    
    color: white;
    background: linear-gradient(to right, var(--vermelho), var(--vermelhoMedio), var(--vermelhoEscuro));
    border: none;
    letter-spacing: 0.05em;
    border-radius: 20px;
    width: 100%;
  }

  button svg {
    margin-right: 3px;
    transform: rotate(0deg);
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
    padding-top: 3px;
  }

  button span {
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }

  button:hover svg {
    transform: translateX(5px) rotate(30deg);
  }

  button:hover span {
    transform: translateX(7px);
  }
`;

export default Button;
