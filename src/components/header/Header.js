import "./Header.scss"
import {Logo} from "./Logo";
import AccountMenuHearder from "../menu_account/AccountMenuHearder";
import MenuHeader from "./MenuHeader";
import Button from "../asset/Button";
import SearchBar from "../SearchBar/SearchBar";
import {useEffect, useState} from "react";
import SearchBarMinimized from "../SearchBar/SearchBarMinimized";
import {useStyle} from "../context/StyleContext";

function Header() {
    const {headerConfig} = useStyle()
    const {isStartExpanded} = headerConfig
    const [backgroundColor, setBackgroundColor] = useState('black')
    const [isExpanded, setIsExpanded] = useState(isStartExpanded)
    const [logoColor, setLogoColor] = useState(isStartExpanded ? "white" : "red")
    const [hasTransition,setHasTransition] = useState(false)
    const handleScroll = (e) => {
        if(!hasTransition) setHasTransition(true)
        if (e.srcElement.documentElement.scrollTop >= 1 && backgroundColor !== 'white') {
            setBackgroundColor('white')
            setIsExpanded(false)
            setLogoColor('red')
        } else if (e.srcElement.documentElement.scrollTop === 0 && isStartExpanded) {
            setBackgroundColor('black')
            setLogoColor('white')
            setIsExpanded(true)
        } else if (isExpanded) {
            setIsExpanded(false)
        }
    }
    const handleMinimizedSearchBarClick = () => {
        if(!hasTransition) setHasTransition(true)
        setIsExpanded(true)
    }
    useEffect(() => {
        setIsExpanded(isStartExpanded)
        setLogoColor(isStartExpanded ? "white" : "red")
        setBackgroundColor(isStartExpanded ? "black" : "white")
        window.onscroll = handleScroll
    }, [headerConfig])

    return (
        <div
            className={
                "header" +
                (
                    isExpanded ?
                        ` header__color--${backgroundColor}`
                        :
                        " header__collapsed header__color--white"
                ) +
                (
                    hasTransition ?
                        ""
                        :
                        " no-transition"
                )
            }>
            <div className="grid-one-one">
                <a href="/">
                    <Logo color={logoColor}/>
                </a>
            </div>
            <div className="grid-one-two">
                {
                    isExpanded
                        ?
                        <>
                            <MenuHeader/>
                            <div className="search-bar-wrapper">
                                <SearchBar/>
                            </div>
                        </>
                        :
                        <SearchBarMinimized onCLick={handleMinimizedSearchBarClick}/>
                }
            </div>
            <div className="grid-one-four">
                <div className="hosting-button-wrapper">
                    <Button link={"/hosting"} text={"Host"}/>
                </div>

                <AccountMenuHearder/>
            </div>
        </div>
    )
}

export default Header;