// ======================================
// LifeSync Pro
// index.js
// ======================================

// ======================================
// NAVBAR SCROLL EFFECT
// ======================================

const navbar =
document.querySelector(
".navbar"
);

window.addEventListener(
"scroll",
()=>{

if(window.scrollY > 50){

navbar.style.background =
"rgba(255,255,255,0.95)";

navbar.style.boxShadow =
"0 10px 30px rgba(0,0,0,.08)";

}
else{

navbar.style.background =
"rgba(255,255,255,0.8)";

navbar.style.boxShadow =
"none";

}

}
);

// ======================================
// SCROLL REVEAL ANIMATION
// ======================================

const revealElements =
document.querySelectorAll(

".feature-card, .profession-card, .step"

);

const revealOnScroll = ()=>{

revealElements.forEach(

(element)=>{

const elementTop =
element.getBoundingClientRect()
.top;

const windowHeight =
window.innerHeight;

if(
elementTop <
windowHeight - 100
){

element.style.opacity = "1";

element.style.transform =
"translateY(0)";

}

}

);

};

revealElements.forEach(

(element)=>{

element.style.opacity = "0";

element.style.transform =
"translateY(40px)";

element.style.transition =
"all .7s ease";

}

);

window.addEventListener(
"scroll",
revealOnScroll
);

revealOnScroll();

// ======================================
// HERO STATS COUNTER
// ======================================

const statNumbers =
document.querySelectorAll(
".hero-stats h3"
);

const animateCounter = (

element,
target

)=>{

let count = 0;

const speed = 30;

const update = ()=>{

if(count < target){

count++;

element.innerText =
count + "+";

setTimeout(
update,
speed
);

}
else{

element.innerText =
target + "+";

}

};

update();

};

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(

(entry)=>{

if(entry.isIntersecting){

statNumbers.forEach(

(stat)=>{

const value =
parseInt(
stat.innerText
);

if(
!stat.dataset.done
){

animateCounter(
stat,
value
);

stat.dataset.done =
"true";

}

}

);

}

}

);

},
{
threshold:0.5
}

);

const statsSection =
document.querySelector(
".hero-stats"
);

if(statsSection){

observer.observe(
statsSection
);

}

// ======================================
// PROFESSION CARD HOVER
// ======================================

const professionCards =
document.querySelectorAll(
".profession-card"
);

professionCards.forEach(

(card)=>{

card.addEventListener(
"mouseenter",
()=>{

card.style.boxShadow =
"0 20px 40px rgba(37,99,235,.25)";

}
);

card.addEventListener(
"mouseleave",
()=>{

card.style.boxShadow =
"none";

}
);

}

);

// ======================================
// CTA BUTTON GLOW
// ======================================

const ctaButton =
document.querySelector(
".cta a"
);

if(ctaButton){

setInterval(()=>{

ctaButton.classList.add(
"pulse"
);

setTimeout(()=>{

ctaButton.classList.remove(
"pulse"
);

},1000);

},3000);

}

// ======================================
// PAGE LOAD ANIMATION
// ======================================

window.addEventListener(
"load",
()=>{

document.body.style.opacity =
"0";

setTimeout(()=>{

document.body.style.transition =
"opacity .8s ease";

document.body.style.opacity =
"1";

},100);

});

// ======================================
// SMOOTH ACTIVE NAV LINKS
// ======================================

const navLinks =
document.querySelectorAll(
'.nav-links a'
);

navLinks.forEach(

(link)=>{

link.addEventListener(
"click",
()=>{

navLinks.forEach(

(nav)=>
nav.classList.remove(
"active"
)

);

link.classList.add(
"active"
);

}
);

}

);

// ======================================
// FLOATING HERO IMAGE
// ======================================

const heroImage =
document.querySelector(
".hero-image img"
);

if(heroImage){

window.addEventListener(
"mousemove",
(e)=>{

const x =
(window.innerWidth / 2 -
e.pageX) / 50;

const y =
(window.innerHeight / 2 -
e.pageY) / 50;

heroImage.style.transform =
`translate(${x}px, ${y}px)`;

}
);

}

// ======================================
// CONSOLE BRANDING
// ======================================

console.log(

"%c⚡ LifeSync Pro",

"color:#2563eb;font-size:24px;font-weight:bold;"

);

console.log(

"%cBuilt with Productivity in Mind 🚀",

"color:#64748b;font-size:14px;"

);