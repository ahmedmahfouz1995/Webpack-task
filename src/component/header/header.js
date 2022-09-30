import "./style.css";
const element = document.createElement("header");

element.innerHTML = "Hagronica";
element.classList.add('info')
element.style.fontStyle = "italic"
document.body.appendChild(element);

// nooo

import photo from '../../assets/image.png'
const img = document.createElement("img");
img.src=photo;
img.style.width="50px"
img.style.height="50px"
element.appendChild(img);



