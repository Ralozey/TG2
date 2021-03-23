
import { DefaultTheme } from "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        id: number,
        backgroundColor?: string,
        borderColor?: string,
        textColor?: string,
        linkColor?: string,
        logoColor?: string,
        fallbackLogoColor?: string,
        buttonColor?: string,
        headerColor?: string,
        logoAnimation?: string,
        headerAnimation?: string,
        boxColor?: string,
        radioColor?: string,
        footerTextColor?: string
    }
  }


//https://www.color-hex.com/color-palette/25362
export const Discord: DefaultTheme = {
    id: 0,
    headerColor: "#23272a",
    backgroundColor: "#2c2f33",
    textColor: "#ffffff",
    buttonColor: "#7289da",
    borderColor: "#7289da",
    linkColor: "#7289da",
    logoColor: "#7289da",
    radioColor: "#7289da"
};


export const ThemeList: Record<number, DefaultTheme> = {
    0: Discord
};