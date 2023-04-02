import { createContext, useState } from "react"

export const ThemeContext = createContext()

export function ThemeContextProvider(props){
    
    const dark = {
        name: 'dark',
        background: '#001529',
        color: '#fff'
    }

    const ligth = {
        name: 'light',
        background: '#fff',
        color: '#1677ff'        
    }

    const [contextTheme, setContextTheme] = useState(dark)

    const switchTheme = () => {
        if(contextTheme.name === 'dark'){
            setContextTheme(ligth)
        }else{
            setContextTheme(dark)
        }
    }

    const value = { contextTheme, switchTheme }

    return(
        <ThemeContext.Provider value={value}>
            {props.children}
        </ThemeContext.Provider>
    )
}