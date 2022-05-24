import { useNavigate, Link } from "react-router-dom";
import "./About.css";
import { StyledHeader } from "../styles/Header.styled";
import { Flex } from "../styles/Flex.styled";
import { Bluedot } from "../styles/Bluedot.styled";
import { Image } from "../styles/Header.styled";
import Button from "../Button/Button";
import logo from "../../assets/images/2.gif";
import { useAuthContext } from "../../hooks/useAuthContext";
import content from '../../content';
import Container from "@mui/material/Container";
import Card from '../../components/Card';

export default function About() {
const { user } = useAuthContext();

  const cardContent = content.filter(item => item.list === false)
  const navigate = useNavigate();
  const theme = {
    colors: {
      dark: '#818181',
      nav: '#E9FCFF',
      header: '#ff0000',
      body: '#FDFDFD',
      footer: '#00333',
      main: '#1976d2',
      secondary: '#1FAAFF',
      tertiary: '#989898',
    }}
  const handleClick = () => {
    navigate("/register");
  };

  return (
    <StyledHeader>
    <Flex jc="space-evenly" ai="center" id="flexContainer">
      <div>
        <h2>Welcome to</h2>
        <h1>
          HMS<Bluedot>.</Bluedot>
        </h1>
        <p>
        HMS was introduced to solve the complications coming from managing all the paper works of every patient associated with the various departments of hospitalization with confidentiality.        </p>
        <Flex jc="space-around">
        {!user && (
              <>
              <Button text={"Register Now"} handleClick={handleClick} />
              </>
            )}
        </Flex>
      </div>
      <Image src={logo} alt="" />
    </Flex>
    <Container>
      
					{cardContent.map((item, index) => (
						<Card key={index} item={item} />
					))}
				</Container>
      
  </StyledHeader>
  
);
};