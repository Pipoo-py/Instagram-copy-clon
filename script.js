const publicationsContainer = document.querySelector(".main__publications-container");
const scrollHistoriesButtonRight = document.querySelector(".right");
const scrollHistoriesButtonIconRight = document.querySelector(".right > i");
const scrollHistoriesButtonLeft = document.querySelector(".left");
const scrollHistoriesButtonIconLeft = document.querySelector(".left > i");
const historiesContainer = document.querySelector(".histories__container");
const historiesSection = document.querySelector(".histories__section");
const generalModalContainer = document.querySelector(".test-modal");
const navContainer = document.querySelector(".nav");

class User{
    constructor(username,logo){
        this.username = username;
        this.logo = logo;
    }
}

class Publication{
    constructor(user,like,comments,ID,content,description,hour){
        this.user = user;
        this.like = like;
        this.comments = comments;
        this.ID = ID;
        this.content = content;
        this.description = description;
        this.hour = hour;
    }
}

class Historie{
    constructor(user,content,possibleClick,ID){
        this.user = user;
        this.content = content;
        this.possibleClick = possibleClick;
        this.ID = ID;
    }
}

const userCreatePublication = (post,description)=>{
    let publiID = Math.random()*500;
    let publication = new Publication({logo: "perfil.jpg", username: "pipoo.py"},0,[],publiID,post,description,0);
    totalPublications.push(publication);
    let publicationsHTMLCode = `
                <div class="publication-top-section">
                    <div class="user-info">
                        <img src="${publication.user.logo}" alt="" style="width: 10%">
                        <span class="username">${publication.user.username}</span>
                        <span class="time-of-publication">${publication.hour}min</span>
                    </div>
                    <div class="more-options">
                        <button class="more-options-button"><i class="fa-solid fa-ellipsis"></i></button>
                    </div>
                </div>
                <div class="publication-content">
                    <img src="${publication.content}" alt="">
                </div>
                <div class="interaction-section">
                    <div class="principal-interactions">
                        <button class="like-button"><i class="fa-regular fa-heart"></i></button>
                        <button><i class="fa-regular fa-comment"></i></button>
                        <button><i class="fa-regular fa-paper-plane"></i></button>
                    </div>
                    <div class="other-interaction">
                        <button><i class="fa-regular fa-bookmark"></i></button>
                    </div>
                </div>
                <div class="likes-description">
                    <span class="like-publication">${publication.like} Me gusta</span>
                    <div class="div-like-to-description">
                        <span class="username-publication">${publication.user.username}</span>
                        <span class="publication-description">${publication.description}</span>
                    </div>
                </div>
                <div class="comment-section">
                    <input type="text" placeholder="Añade un comentario...">
                </div>
    `;
    let publicationContent = document.createElement("div");
    publicationContent.classList.add("main__publication");
    publicationContent.innerHTML = publicationsHTMLCode;
    publicationsContainer.appendChild(publicationContent);
    observerPublications.observe(publicationContent);
    // Interacciones
    publicationContent.addEventListener("click",(e)=>{
    if(e.target.classList[1] == "fa-heart") interactionLike(e,publication,publicationContent);
    else if(e.target.classList[1] == "fa-comment") interactionComment(e,publication,publicationContent);
});
}

const userGetPublication = image=>{
    let modalHTMLCode = `
    <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
    <div class="modal-publicate">
        <section class="publicate-top">
            <h2>Crear una nueva publicación</h2>
        </section>
        <section class="drop-section">
            <img src="${image}" alt="">
            <input type="text" placeholder="Escriba la descripción" id="inputDescription">
            <button class="publicate-button">Publicar</button>
        </section>
    `;
    let modalContainer = document.createElement("div");
    modalContainer.innerHTML = modalHTMLCode;
    modalContainer.classList.add("modal-publicate-bg");
    generalModalContainer.appendChild(modalContainer);
    document.body.style.overflow = "hidden";
    document.querySelector(".modal-publicate-bg button").addEventListener("click",(e)=>{
        generalModalContainer.removeChild(modalContainer);
        document.body.style.overflow = "auto";
})
    document.querySelector(".publicate-button").addEventListener("click",()=>{
        let inputOfDescription = document.getElementById("inputDescription");
        userCreatePublication(image,inputOfDescription.value);
        generalModalContainer.removeChild(modalContainer);
        document.body.style.overflow = "auto";
    })
}


const userDropImg = ()=>{
    let modalHTMLCode = `
        <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        <div class="modal-publicate">
            <section class="publicate-top">
                <h2>Crear una nueva publicación</h2>
            </section>
            <section class="drop-section">
                <i class="fa-regular fa-image"></i>
                <h3>Arrastra las fotos y vídeos aquí</h3>
                <input type="file" accept="image/*" id="fileInput">
            </section>
    `;
    let modalContainer = document.createElement("div");
    modalContainer.innerHTML = modalHTMLCode;
    modalContainer.classList.add("modal-publicate-bg");
    generalModalContainer.appendChild(modalContainer);
    let fileInput = document.getElementById("fileInput");
    document.body.style.overflow = "hidden";
    document.querySelector(".modal-publicate-bg button").addEventListener("click",(e)=>{
        generalModalContainer.removeChild(modalContainer);
        document.body.style.overflow = "auto";
    })

    document.querySelector(".modal-publicate").addEventListener('click', () => fileInput.click() );

    document.querySelector(".modal-publicate").addEventListener("drop",(e)=>{
        let reader = new FileReader();
        reader.readAsDataURL(e.dataTransfer.files[0]);
        reader.onload = function(e){
            let img = document.createElement("img");
            img.src = `${e.target.result}`;
            generalModalContainer.removeChild(modalContainer);
            userGetPublication(img.src);
        }
    })
}

navContainer.addEventListener("click",(e)=>{
    if(e.target.classList[1] == "fa-square-plus") userDropImg();
})

historiesSection.addEventListener("click",(e)=>{
    if(e.target == scrollHistoriesButtonRight || e.target == scrollHistoriesButtonIconRight){
        historiesContainer.scrollLeft -= -500;
    }
    else if(e.target == scrollHistoriesButtonLeft || e.target == scrollHistoriesButtonIconLeft){
        historiesContainer.scrollLeft -= 500;
    }
})


let totalPublications = [];
let totalHistories = [];

const getUsers = async ()=>{
    let requestToFile = await fetch("users.txt");
    let infoOfRequest = await requestToFile.json();
    return infoOfRequest;
}
const getImgs = async ()=>{
    let requestToFile = await fetch("content-publications.txt");
    let infoOfRequest = await requestToFile.json();
    return infoOfRequest;
}

const createUser = async ()=>{
    let usersList = await getUsers();
    let randomUser = parseInt(Math.random()*usersList.length);
    let user = new User(usersList[randomUser].name, usersList[randomUser].logo);
    return user;
}

const getDescription = async()=>{
    let requestToFile = await fetch("possible-descriptions.txt");
    let infoOfRequest = await requestToFile.json();
    let randomIndex = parseInt(Math.random()*infoOfRequest.length);
    return infoOfRequest[randomIndex].description;
}

const requestComments = async()=>{
    let arrayOfComments = [];
    let requestToFile = await fetch("possible-comments.txt");
    let infoOfRequest = await requestToFile.json();
    let numOfCommentsInPublication = parseInt(Math.random()*100);
    for(let i = 0; i < numOfCommentsInPublication; i++){
        let objectComment = {
            finalComment: "",
            user: null,
        };
        let userOfComment = await createUser();
        let randomCommentIndex = parseInt(Math.random()*infoOfRequest.length);
        let commentSelected = infoOfRequest[randomCommentIndex].comment;
        objectComment.finalComment = commentSelected;
        objectComment.user = userOfComment;
        arrayOfComments.push(objectComment);
    }
    return arrayOfComments;
}

const interactionLike = (e,publication,publicationContent)=>{
    if(e.target.parentElement.classList[1] != "liked"){
        let likeButton = e.target.parentElement;
        likeButton.classList.add("liked");
        likeButton.innerHTML = `<i class="fa-solid fa-heart" style="color: #e42;"></i>`;
        e.target.style.color = "#e43";
        likeButton.style.animation = "like .4s forwards";
        publication.like++;
        publicationContent.children[3].children[0].textContent = `${publication.like} Me gusta`;
        setTimeout(()=> likeButton.style.animation = "none", 500);
    }
    else if(e.target.parentElement.classList[1] == "liked"){
        let likeButton = e.target.parentElement;
        likeButton.classList.remove("liked");
        likeButton.innerHTML = `<i class="fa-regular fa-heart"></i>`;
        e.target.style.color = "#fff";
        likeButton.style.animation = "like .4s forwards";
        publication.like--;
        publicationContent.children[3].children[0].textContent = `${publication.like} Me gusta`;
        setTimeout(()=> likeButton.style.animation = "none", 500);
    }
}

const interactionComment = publication=>{
    let modalOfCommentsHTMLCode = `
            <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
            <div class="modal-comments">
                <div class="modal-content">
                    <section class="modal-media">
                        <img src=${publication.content} alt="">
                    </section>
                    <section class="modal-comment-info">
                        <div class="modal-publication-info">
                            <div class="modal-user-info">
                                <div class="modal-user-img-container">
                                    <img src=${publication.user.logo} alt="">
                                </div>
                                <span class="modal-username">${publication.user.username}</span>
                            </div>
                            <div class="more-options">
                                <button class="more-options-button"><i class="fa-solid fa-ellipsis"></i></button>
                            </div>
                        </div>
                        <section class="modal-comments-container">

                        </section>
                    </section>
                </div>
            </div>
    `;
    let modalBgAndContainer = document.createElement("div");
    modalBgAndContainer.classList.add("modal-comments-bg");
    modalBgAndContainer.innerHTML = modalOfCommentsHTMLCode;
    document.body.appendChild(modalBgAndContainer);

    for(let i = 0; i < publication.comments.length; i++){
        let commentHTMLCode = `
            <div class="modal-comment-user-info">
                <div class="modal-comment-user-img-container">
                    <img src=${publication.comments[i].user.logo} alt="">
                </div>
                <span class="modal-comment-username">${publication.comments[i].user.username}</span>
            </div>
            <p class="modal-comment-content">
            ${publication.comments[i].finalComment}
            </p>
`;  
    let commentDiv = document.createElement("div");
    commentDiv.classList.add("modal-comment");
    commentDiv.innerHTML = commentHTMLCode;
    document.querySelector(".modal-comments-container").appendChild(commentDiv);
    }
    document.body.style.overflow = "hidden";
    modalBgAndContainer.addEventListener("click",(e)=>{
        if(e.target.classList[1] == "fa-xmark"){
            document.body.removeChild(modalBgAndContainer);
            document.body.style.overflow = "auto";
        }
    })
}


const createPublication = async()=>{
    let possibleContents = await getImgs();
    let user = await createUser();
    let comments = await requestComments();
    let description = await getDescription();
    let randomHour = parseInt(Math.random()*60);
    let finalContentOfPublication = possibleContents[parseInt(Math.random()*possibleContents.length)].content;
    let numLikes = parseInt(Math.random()*100);
    let publiID = Math.random()*500;
    let publication = new Publication(user,numLikes,comments,publiID,finalContentOfPublication,description,randomHour);
    totalPublications.push(publication);
    let publicationsHTMLCode = `
                <div class="publication-top-section">
                    <div class="user-info">
                        <img src="${publication.user.logo}" alt="">
                        <span class="username">${user.username}</span>
                        <span class="time-of-publication">${publication.hour}min</span>
                    </div>
                    <div class="more-options">
                        <button class="more-options-button"><i class="fa-solid fa-ellipsis"></i></button>
                    </div>
                </div>
                <div class="publication-content">
                    <img src="${publication.content}" alt="">
                </div>
                <div class="interaction-section">
                    <div class="principal-interactions">
                        <button class="like-button"><i class="fa-regular fa-heart"></i></button>
                        <button><i class="fa-regular fa-comment"></i></button>
                        <button><i class="fa-regular fa-paper-plane"></i></button>
                    </div>
                    <div class="other-interaction">
                        <button><i class="fa-regular fa-bookmark"></i></button>
                    </div>
                </div>
                <div class="likes-description">
                    <span class="like-publication">${publication.like} Me gusta</span>
                    <div class="div-like-to-description">
                        <span class="username-publication">${publication.user.username}</span>
                        <span class="publication-description">${publication.description}</span>
                    </div>
                </div>
                <div class="comment-section">
                    <input type="text" placeholder="Añade un comentario...">
                </div>
    `;
    let publicationContent = document.createElement("div");
    publicationContent.classList.add("main__publication");
    publicationContent.innerHTML = publicationsHTMLCode;
    publicationsContainer.appendChild(publicationContent);
    observerPublications.observe(publicationContent);
    // Interacciones
    publicationContent.addEventListener("click",(e)=>{
    if(e.target.classList[1] == "fa-heart") interactionLike(e,publication,publicationContent);
    else if(e.target.classList[1] == "fa-comment") interactionComment(publication);
});
}

const viewHistorie = historie=>{
    let fullHistorieHTMLCode = `
        <section class="top-section">
            <img src="logo.png" alt="">
            <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
        </section>
        <section class="modal-historie-section">
            <div class="modal-historie-user-info">
                <div class="modal-historie-user-logo-container">
                    <img src=${historie.user.logo} alt="">
                </div>
                <span class="modal-historie-user-username">${historie.user.username}</span>
            </div>
            <img src=${historie.content.content} alt="">
        </section>
    `;
    let historieBgAndContainer = document.createElement("div");
    historieBgAndContainer.classList.add("modal-historie-bg");
    historieBgAndContainer.innerHTML = fullHistorieHTMLCode;
    generalModalContainer.appendChild(historieBgAndContainer);
    document.body.style.overflow = "hidden";

    document.querySelector(".top-section button").addEventListener("click",(e)=>{
        generalModalContainer.removeChild(historieBgAndContainer);
        document.body.style.overflow = "auto";
    })
}

historiesContainer.addEventListener("click",(e)=>{
    if(e.target.parentElement.parentElement.classList == "historie-border-true"){
        console.log(e.target.parentElement.id);
        for(let i = 0; i < totalHistories.length;i++){
            if(e.target.parentElement.id == totalHistories[i].ID){
                viewHistorie(totalHistories[i]);
                break;
            }
        }
    }
})

const generateHistories = async(historie)=>{
    let finalHistorie = historie;
    if(finalHistorie.possibleClick == true){
        let historieHTMLCode = `
                <div class="historie-img-container" id="${historie.ID}">
                    <img src=${historie.user.logo} alt="">
                </div>
        `;
        let historieDivContainer = document.createElement("div");
        historieDivContainer.classList.add("historie-border-true");
        historieDivContainer.innerHTML = historieHTMLCode;
        historiesContainer.appendChild(historieDivContainer);
    } else{
        let historieHTMLCode = `
        <div class="historie-img-container">
            <img src=${historie.user.logo} alt="">
        </div>
        `;
        let historieDivContainer = document.createElement("div");
        historieDivContainer.classList.add("historie-border-false");
        historieDivContainer.innerHTML = historieHTMLCode;
        historiesContainer.appendChild(historieDivContainer);
    }
}

const createHistories = async ()=>{
    for(let i = 0; i < 100; i++){
        let possibleHistorieTrue = parseInt(Math.random()*100);
        if(possibleHistorieTrue >= 50){
            let userHistorie = await createUser();
            let contentHistorie = await getImgs();
            let finalContentOfHistorie = contentHistorie[parseInt(Math.random()*contentHistorie.length)];
            let historieID = Math.random()*500;
            let historie = new Historie(userHistorie,finalContentOfHistorie,true,historieID);
            totalHistories.push(historie);
            generateHistories(historie);
        } 
        else{
            let userHistorie = await createUser(); 
            let historie = new Historie(userHistorie,null,false);
            totalHistories.push(historie);
            generateHistories(historie);
        }
    }
}
const generatePublications = entrie=>{
    if(entrie[0].isIntersecting && entrie[0].target.classList[1] != "viewed"){
        entrie[0].target.classList.add("viewed");
        createPublication();
    }
}
const observerPublications = new IntersectionObserver(generatePublications);

createPublication();
createHistories();