import React from "react";
import { useState } from "react";
import styled from "styled-components";
import "antd/dist/antd.min.css";
import { ReactComponent as CloseIcon } from "../images/close.svg";
import { ReactComponent as CircleIcon } from "../images/circle.svg";
import { Modal, Space } from "antd";

const Boxs = () => {
  const [turn, setTurn] = useState("x");
  const [cells, setCells] = useState(Array(9).fill(""));

  const [winner, setWinner] = useState();
  const [winnerBox, setWinnerBox] = useState([]);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      handleRestart();
    }, 2000);
  };

  const handleCancel = () => {
    handleRestart();
    setVisible(false);
  };

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
            showModal();
          }, 200);
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

      <Modal
        title={
          <Space size={"small"} align="center">
            <div>
              {winner === "x" ? (
                <CloseIcon className="winner" />
              ) : (
                <CircleIcon />
              )}
            </div>
            <p>is the winner!</p>
          </Space>
        }
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Play again"
      >
        <img
          src="https://media0.giphy.com/media/lZTvTGEGKU6gnQ2wBr/giphy.gif"
          alt=""
          className="winner-gif"
        />
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
