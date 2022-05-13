import { useNavigate } from "react-router-dom";
import "./About.css";
import { StyledHeader } from "../styles/Header.styled";
import { Flex } from "../styles/Flex.styled";
import { Bluedot } from "../styles/Bluedot.styled";
import { Image } from "../styles/Header.styled";
import Button from "../Button/Button";
import logo from "../../assets/images/2.gif";
// components
import content from '../../content';
import Container from "@mui/material/Container";

import Card from '../../components/Card';
import ListCard from '../../components/ListCard';

export default function About() {
  const cardContent = content.filter(item => item.list === false)
  const listContent = content.filter(item => item.list === true)
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
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
        </p>
        <Flex jc="space-around">
        <Button text={"Register Now"} handleClick={handleClick} />
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