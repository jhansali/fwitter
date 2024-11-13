import styled from "styled-components";
import { styledNextButtonProps } from "../../../../utils/GlobalInterfaces";

export const StyledNextButton = styled.button<styledNextButtonProps>`
    width: 100%;
    height: 52px;
    font-size: 17px;
    color: white;
    background-color: ${(props) => props.color === "blue" ? props.theme.colors.blue : props.theme.colors.darkgrey};
    opacity: ${(props) => props.active ? 1 : 0.5};
    border-radius: 50px;
    cursor: ${(props) => props.active ? "pointer" : "default"};

`