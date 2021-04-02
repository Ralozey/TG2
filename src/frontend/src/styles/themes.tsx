
import { DefaultTheme } from "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        id: number,
        backgroundColor?: string,
        borderColor?: string,
        textColor?: string,
        linkColor?: string,
        buttonColor?: string,
        headerColor?: string,
        boxColor?: string,
        radioColor?: string
    }
  }

export const White: DefaultTheme = {
    id: 0,
    textColor: "#333333",
    backgroundColor: "#ffffff",
    linkColor: "#706c61",
    buttonColor: "#e1f4f3",
    boxColor: "#ffffff"
};

export const TG: DefaultTheme = {
    id: 1,
    textColor: "#ffffff",
    backgroundColor: "#000000",
    linkColor: "#FFB502",
    buttonColor: "#4C8900",
    borderColor: "#FF0080",
    boxColor: "#131313"
}

//https://www.color-hex.com/color-palette/25362
export const Discord: DefaultTheme = {
    id: 2,
    headerColor: "#23272a",
    backgroundColor: "#2c2f33",
    textColor: "#ffffff",
    buttonColor: "#7289da",
    borderColor: "#7289da",
    linkColor: "#7289da",
    radioColor: "#7289da",
    boxColor: "#2c2f33"
};

export const Dark: DefaultTheme = {
    id: 3,
    backgroundColor: "#040507",
    linkColor: "#84693b",
    textColor: "#ffffff",
    buttonColor: "#304e60",
    borderColor: "#141a23",
    boxColor: "#030407"
};


export const ThemeList: Record<number, DefaultTheme> = {
    0: White,
    1: TG,
    2: Discord,
    3: Dark
};