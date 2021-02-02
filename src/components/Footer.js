import React from "react"
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai'

const Footer = () => {
    return (
        <div className="footer">
            <p>Data from <a href="https://disease.sh/">disease.sh API</a></p>
            <div className="footer-name">
                <span>Made by Kyle </span>
                <div className="icons">
                    <a href="https://github.com/kyle-richardson"><AiFillGithub /></a>
                    <a href="https://www.linkedin.com/in/kyle-m-richardson/"><AiFillLinkedin/></a>
                    <a href="mailto:kylerichardson1@gmail.com"><AiFillMail/></a>
                </div>
            </div> 
        </div>
    )
}

export default Footer