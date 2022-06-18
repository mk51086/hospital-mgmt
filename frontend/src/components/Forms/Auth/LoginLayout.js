import React,{useState} from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import loginbg from "../../../assets/images/registerbg.jpg"
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
const LoginLayout = () => {
    const [isPatient, setIsPatient] = useState(true);
      const handleSwitch = () => {
    setIsPatient(!isPatient);
  };
  const navigate = useNavigate();

    return (
        <Container>
                <ImagesSide>
                <Background src={loginbg} />
            </ImagesSide>
            <FormSide>
                <Block>
                     <LoginForm isPatient={isPatient} handleSwitch={handleSwitch} />
                     <Link onClick={() => navigate("/register")} color="secondary.main" href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
                </Block>
            </FormSide>
        </Container>
    )
}

export default LoginLayout;

const Container = styled.div`
    height:100vh;
    width:100%;
    display:flex;
    flex-direction:row;
    @media screen and (max-width:800px){
        flex-direction:column-reverse;
        align-items:center;
    }
`

const FormSide = styled.div`
    background:#ffffff;
    flex:4;

    @media screen and (max-width:800px){
        width:80vw;
        margin:-20em 0 3em 0;
        border-radius:9pt;
        z-index:1;
    }
    @media screen and (max-width:600px){
        width:100vw;
        margin:0;
        border-radius:0;
    }

`
const Logo = styled.img`
    height:3em;
    width:3em;
`
const Block = styled.div`
    padding:1.5em 0;
    display:flex;
    flex-direction:column;
    align-items:center;
    
    h1 {
        font-size:1.5em;
    }
    a {
        text-transform:uppercase;
        font-size:.69em;
        margin:.3em;
    }
`



const ImagesSide = styled.div`
    background:#232f3e;
    flex:8;
    @media screen and (max-width:800px){
        max-height:45vh;
    }
    @media screen and (max-width:600px){
        max-height:24vh;
    }

`;

const Background = styled.img`
    height:100vh;
    width:100%;
    object-fit:cover;
    @media screen and (max-width:800px){
        max-height:45vh;
    }
    @media screen and (max-width:600px){
        max-height:24vh;
    }
`