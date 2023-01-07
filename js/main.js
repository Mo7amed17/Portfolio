


let loader=document.querySelector(".loader")
window.addEventListener("load",()=>{
    loader.style.display="none"
})



let fingerprint=document.querySelector(".fingerprint i")
let menu=document.querySelector(".menu")
menu.style.left="-100%"
document.addEventListener("click",function(ele){
if(ele.target===fingerprint)
{if(menu.style.left==="-100%"){
    menu.style.left="0%"
menu.style.transitionDuration="1s"}
else {
    menu.style.left="-100%"
    menu.style.transitionDuration="1.5s"
}
}
else {
    menu.style.left="-100%"
menu.style.transitionDuration="1.5s"
}
})
let a=document.querySelectorAll(".bottom ul li a")
a[0].onclick=function(){
    window.scrollTo({
        top : 0,
        behavior:"smooth"
    })
}
a.forEach(ele => {
    ele.onclick=()=>{
        a.forEach(element => {
            element.classList.remove("activemenu")
        });
        ele.classList.add("activemenu")
    }
});

let titles=document.querySelectorAll(".thetitle span")
let images=document.querySelectorAll(".skills .skillsphoto span")
let delay=0.8
let time=0
let home =document.querySelector(".home")
let elements=document.querySelectorAll(".ele")
let toup=document.querySelector(".toup ")
let click=0;
toup.addEventListener("click",()=>{
    click=1;
    setTimeout(()=>{
        toup.style.color="black"
    },200)
    setTimeout(() => {
        toup.style.color="1e1e1e"
        window.scrollTo({
            top : 0,
            behavior:"smooth"
        })
    }, 500);
    setTimeout(() => {
        toup.style.color="white"
        click=0;
    }, 700);
})
window.addEventListener("scroll",()=>{

    if(scrollY >= home.clientHeight/4){
        toup.style.display="none"
        elements[0].style.left="0%"
        elements[0].style.transitionDuration="2s"
        titles[0].style.width="100%"
        a.forEach(element => {
            element.classList.remove("activemenu")
        });
        a[1].classList.add("activemenu")
    }
    else if(scrollY<= 100){
        elements.forEach(element => {
            element.style.left="-100%"
            element.style.transitionDuration="0s"
            titles.forEach(title => {
                title.style.width="0%"
            });
            images.forEach(image => {
                time=0
                delay=0.8
                image.style.left="-100%"
                image.style.transitionDelay="0s"
                image.style.transform="rotate(0deg)"
                a.forEach(element => {
                    element.classList.remove("activemenu")
                });
                a[0].classList.add("activemenu")
            });
        });
    }
    if(scrollY >= (home.clientHeight + elements[0].clientHeight/2)){
        if(click===0){
            toup.style.display="block"
        }else{
            toup.style.display="none"
        }
        elements[1].style.left="0%"
        elements[1].style.transitionDuration="2s"
        titles[1].style.width="100%"
        a.forEach(element => {
            element.classList.remove("activemenu")
        });
        a[2].classList.add("activemenu")
        setTimeout(() => {
            images.forEach(image => {
                time=time+delay
                image.style.left="0%"
                image.style.transitionDelay=`${time}s`
                image.style.transform="rotate(360deg)"
            });
        }, 2100);
    }
    if(scrollY >= (home.clientHeight + elements[0].clientHeight + elements[1].clientHeight/2)){
        elements[2].style.left="0%"
        elements[2].style.transitionDuration="2s"
        titles[2].style.width="100%"
        a.forEach(element => {
            element.classList.remove("activemenu")
        });
        a[3].classList.add("activemenu")
    }
})

function createProject(data,photo){
    let projects=document.querySelector(".projects .container .data")

    let project=document.createElement("div")
    project.classList.add("project")
    projects.appendChild(project)

    let h1=document.createElement("h1")
    let h1text=document.createTextNode(`${data.name}`)
    h1.appendChild(h1text)
    project.appendChild(h1)

    let projectimage=document.createElement("div")
    projectimage.classList.add("projectimage")
    project.appendChild(projectimage)

    let img=document.createElement("img")
    img.src=`${photo}`
    img.alt=""
    projectimage.appendChild(img)


    let projectbuttons=document.createElement("div")
    projectbuttons.classList.add("projectbuttons")
    project.appendChild(projectbuttons)

    let a1=document.createElement("a")
    a1.target="_blank"
    let a1text=document.createTextNode("Live Demo")
    a1.appendChild(a1text)
    a1.href=`https://mo7amed17.github.io/${data.name}`
    projectbuttons.appendChild(a1)

    let a2=document.createElement("a")
    a2.target="_blank"
    let a2text=document.createTextNode("Source Code")
    a2.appendChild(a2text)
    a2.href=`${data.html_url}`
    projectbuttons.appendChild(a2)


    let projecticons=document.createElement("div")
    projecticons.classList.add("projecticons")
    project.appendChild(projecticons)

    let stars=document.createElement("div")
    stars.classList.add("stars")
    projecticons.appendChild(stars)
    let h2=document.createElement("h2")
    let h2text=document.createTextNode("Stars")
    h2.appendChild(h2text)
    stars.appendChild(h2)
    let span=document.createElement("span")
    let spantext=document.createTextNode(`${data.stargazers_count}`)
    span.appendChild(spantext)
    stars.appendChild(span)
    let i=document.createElement("i")
    i.className="fa-solid fa-star"
    stars.appendChild(i)

    let watches=document.createElement("div")
    watches.classList.add("watches")
    projecticons.appendChild(watches)
    let h22=document.createElement("h2")
    let h22text=document.createTextNode("Watches")
    h22.appendChild(h22text)
    watches.appendChild(h22)
    let span2=document.createElement("span")
    let spantext2=document.createTextNode(`${data.watchers_count}`)
    span2.appendChild(spantext2)
    watches.appendChild(span2)
    let i2=document.createElement("i")
    i2.className="fa-solid fa-eye"
    watches.appendChild(i2)


}

fetch("https://api.github.com/users/mo7amed17/repos")
.then((res)=>res.json())
.then((data)=>{
    data.map((e)=>{
        fetch(`https://mo7amed17.github.io/projects-photo-url/db.json`).then((res)=>res.json())
        .then((d)=>{
            d.photos.map((photo)=>{
                if(photo.name===e.name){
                    createProject(e,photo.url)
                }
            })
        })
    })
})


