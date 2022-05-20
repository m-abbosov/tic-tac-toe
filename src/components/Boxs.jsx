import React from "react";
import { useState } from "react";
import styled from "styled-components";

import { ReactComponent as CloseIcon } from "../images/close.svg";
import { ReactComponent as CircleIcon } from "../images/circle.svg";
import { Button, Modal } from "react-bootstrap";

const Boxs = () => {
  const [turn, setTurn] = useState("x");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();
  const [winnerBox, setWinnerBox] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleRestart();
  };
  const handleShow = () => setShow(true);

  const checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
          setWinnerBox(pattern);

          setTimeout(() => {
            handleShow();
          }, 4000);
        }
      });
    }
  };

  const handleClick = (num) => {
    if (cells[num] !== "") {
      alert("already clicked");
      return;
    }

    let squares = [...cells];

    if (turn === "x") {
      squares[num] = "x";
      setTurn("o");
    } else {
      squares[num] = "o";
      setTurn("x");
    }

    checkForWinner(squares);
    setCells(squares);
  };

  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
    setWinnerBox([]);
  };

  const Box = ({ num }) => {
    return (
      <div
        className={
          num === winnerBox[0] || num === winnerBox[1] || num === winnerBox[2]
            ? "active box"
            : "box"
        }
        onClick={() => handleClick(num)}
      >
        {(cells[num] === "x" && <CloseIcon />) ||
          (cells[num] === "o" && <CircleIcon />)}
      </div>
    );
  };
  return (
    <>
      <Wrapper>
        <Box num={0} />
        <Box num={1} />
        <Box num={2} />

        <Box num={3} />
        <Box num={4} />
        <Box num={5} />

        <Box num={6} />
        <Box num={7} />
        <Box num={8} />
      </Wrapper>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {winner === "x" ? <CloseIcon className="winner" /> : <CircleIcon />}
            is the winner!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex align-items-center">
          <img
            src="https://media0.giphy.com/media/lZTvTGEGKU6gnQ2wBr/giphy.gif"
            alt=""
            className="winner-gif"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Play Again
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Boxs;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(3, 90px);
  gap: 22px;

  @media (max-width: 500px) {
    grid-template-columns: repeat(3, 62px);
  }

  .box {
    border: 5.56757px solid #ffffff;
    border-radius: 30px;
    height: 90px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    &.active {
      background-color: #0336ff;
    }

    @media (max-width: 500px) {
      height: 62px;
      border-radius: 21px;
    }
  }
`;
