const navbar = document.querySelector(".navbar");
const linksContainer = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-btn");
const timelineContainer = document.querySelector(".container");

window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  console.log(navHeight);
  if (scrollHeight > navHeight) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
  
 
  
});

// toggle menu/navbar script
menuBtn.addEventListener("click", () => {
  linksContainer.classList.toggle("active");
  menuBtn.children[0].classList.toggle("active");
});

// smooth scroll
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function(link){
   link.addEventListener('click',(e)=>{

    e.preventDefault();

    const id = e.currentTarget.getAttribute('href').slice(1);
    const element = document.getElementById(id);

    let position = element.offsetTop - 54.8125;

    
        window.scrollTo({
            left:0,
            top: position
        });


  })
});
