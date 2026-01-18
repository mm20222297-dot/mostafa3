let rating = 0;
let selectedEmoji = "";

window.onload = function() {
    const widget = document.querySelector(".my-comments-widget");
    const starRate = widget.querySelector("#starRate");
    const commentsList = widget.querySelector("#commentsList");
    const emojiBox = widget.querySelector("#emojiBox");
    const commentInput = widget.querySelector("#commentInput");
    const addCommentBtn = widget.querySelector("#addCommentBtn");
    const emojiBtn = widget.querySelector("#emojiBtn");

    renderStars();
    renderComments();

    emojiBtn.addEventListener("click", toggleEmojis);
    addCommentBtn.addEventListener("click", addComment);

    emojiBox.addEventListener("click", function(e){
        if(e.target.innerText){
            selectedEmoji = e.target.innerText;
            commentInput.value = selectedEmoji;
            emojiBox.style.display = "none";
        }
    });

    function renderStars() {
        const maxStars = parseInt(starRate.getAttribute("data-max") || "5");
        starRate.innerHTML = "";
        for(let i=1;i<=maxStars;i++){
            const star = document.createElement("span");
            star.innerText = "★";
            star.dataset.value = i;
            starRate.appendChild(star);
        }

        starRate.querySelectorAll("span").forEach(star=>{
            star.addEventListener("mouseover",()=>fillStars(star.dataset.value,true));
            star.addEventListener("mouseout",()=>fillStars(rating,false));
            star.addEventListener("click",()=>{ rating=parseInt(star.dataset.value); fillStars(rating,false); });
        });

        fillStars(rating,false);
    }

    function fillStars(count,hover){
        starRate.querySelectorAll("span").forEach(star=>{
            if(star.dataset.value <= count){
                star.classList.add(hover?"hover":"active");
                star.classList.remove(hover?"active":"hover");
            }else{
                star.classList.remove("hover","active");
            }
        });
    }

    function toggleEmojis(){
        emojiBox.style.display = emojiBox.style.display==="block"?"none":"block";
    }

    function addComment(){
        const text = commentInput.value.trim();
        if(!text) return;
        let comments = JSON.parse(localStorage.getItem("comments")||"[]");
        comments.push({text:text,rating:rating,replies:[]});
        localStorage.setItem("comments",JSON.stringify(comments));
        commentInput.value="";
        rating=0;
        selectedEmoji="";
        renderStars();
        renderComments();
    }

    function renderComments(){
        commentsList.innerHTML="";
        let comments = JSON.parse(localStorage.getItem("comments")||"[]");

        comments.forEach((comment,index)=>{
            const commentBox = document.createElement("div");
            commentBox.className="comment";
            commentBox.innerHTML=`<p>${comment.text}</p><p>⭐ التقييم: ${comment.rating}</p>`;

            // زرار مسح التعليق
            const deleteBtn = document.createElement("button");
            deleteBtn.className="delete-btn";
            deleteBtn.innerText="مسح التعليق";
            deleteBtn.addEventListener("click",()=>{
                comments.splice(index,1);
                localStorage.setItem("comments",JSON.stringify(comments));
                renderComments();
            });
            commentBox.appendChild(deleteBtn);

            // ‼️ إضافة مسح الردود
            comment.replies.forEach((reply, rIndex)=>{
                const replyDiv = document.createElement("div");
                replyDiv.className="reply";

                const replyText = document.createElement("span");
                replyText.innerText = reply;

                const deleteReplyBtn = document.createElement("button");
                deleteReplyBtn.className = "delete-reply-btn";
                deleteReplyBtn.innerText = "مسح الرد";

                deleteReplyBtn.addEventListener("click", ()=>{
                    let comments = JSON.parse(localStorage.getItem("comments") || "[]");
                    comments[index].replies.splice(rIndex, 1); 
                    localStorage.setItem("comments", JSON.stringify(comments));
                    renderComments();
                });

                replyDiv.appendChild(replyText);
                replyDiv.appendChild(deleteReplyBtn);
                commentBox.appendChild(replyDiv);
            });

            // زرار الرد
            const replyBtn = document.createElement("button");
            replyBtn.className="reply-button";
            replyBtn.innerText="رد";
            replyBtn.addEventListener("click",()=>openReplyInput(commentBox,index));
            commentBox.appendChild(replyBtn);

            commentsList.appendChild(commentBox);
        });
    }

    function openReplyInput(commentBox,index){
        let existingInput = commentBox.querySelector(".reply-input");
        if(existingInput) {
            existingInput.focus();
            return;
        }

        const replyInput = document.createElement("input");
        replyInput.className="reply-input";
        replyInput.placeholder="اكتب ردك...";

        const sendBtn = document.createElement("button");
        sendBtn.className="reply-button";
        sendBtn.innerText="إرسال الرد";

        sendBtn.addEventListener("click",()=>{
            const replyText = replyInput.value.trim();
            if(!replyText) return;
            let comments = JSON.parse(localStorage.getItem("comments")||"[]");
            comments[index].replies.push(replyText);
            localStorage.setItem("comments",JSON.stringify(comments));
            renderComments();
        });

        commentBox.appendChild(replyInput);
        commentBox.appendChild(sendBtn);
        replyInput.focus();
    }
};
