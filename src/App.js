import styled from "styled-components";
import Boxs from "./components/Boxs";
import Logo from "./images/logo.svg";

function App() {
  return (
    <Wrapper>
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <Boxs />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: #ff0266;
  padding: 63px 75px;

  @media (max-width: 500px) {
    padding: 20px;
  }
`;
