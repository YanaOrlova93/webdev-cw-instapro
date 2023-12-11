import { getToken, renderApp, posts, setPosts } from "../index.js";
import { setLike, deleteLike, getUserPosts} from "../api.js"

export const likeEventListener = () => {
    const likeButtons = document.querySelectorAll(".like-button");

    likeButtons.forEach(lokeButton => {
        likeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const postId = likeButton.dataset.postId;
        const index = likeButton.dataset.index;

        likeButton.classList.add("shake-bottom");

        if (posts[index].isLiked) {
            deleteLike( {token: getToken(), postId })
            .then(() => {
                posts[index].isLiked = false;
            })
            .then(() => {
                getUserPosts({ token: getToken() })
                .then((response) => {
                    setPosts(response);
                    likeButton.classList.delete("shake-bottom");
                    renderApp();
                        })
    })
} else {
    setLike({ token: getToken(), postId })
    .then(() => {
        posts[index].isLiked = true;
    })
    .then(() => {
        getUserPosts({token: getToken() })
        .then((response) => {
            setPosts(response);
            likeButton.classList.delete("shake-bottom");
            renderApp();
        })
    })
}

        });
    });
};
