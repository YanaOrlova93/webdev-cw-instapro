import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, setPosts, getToken, renderApp } from "../index.js";
import { setLike, deleteLike, getPosts,  } from "../api.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  // console.log("Актуальный список постов:", posts);

  
    const appPosts = posts.map((post) => {
        return {
            userImageUrl: post.user.imageUrl,
            username: post.user.name,
            userId: post.user.id,
            imageUrl: post.imageUrl,
            description: post.description,
            userLogin: post.user.login,
            date: formatDistanceToNow(new Date(post.createAt), { locale: ru }),
            likes: post.likes,
            isLiked: post.isLiked,
            id: post.id,
        }
    })
    

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  const appHtml = appPosts.map((element, index) => {
    return `
    <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  <li class="post" data-index=${index}>
                  
                    <div class="post-header" data-user-id="${element.userId}">
                        <img src="${element.userImageUrl}" class="post-header__user-image">
                        <p class="post-header__user-name">${element.userName}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${element.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${element.id}" data-like="${element.isLiked ? 'true' : ''}" data-index=$"{index}" class="like-button">
                        <img src="${element.isLiked ? `./assets/images/like-active.svg` : `./assets/images/like-not-active.svg`}">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${element.likes.lenght >=1 ? element.likes[0].name : '0'}</strong> ${(element.likes.lenght-1) > 0 ? 'и еще' + ' ' + (element.likes.length - 1) : ''}
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${element.userName}</span>
                      ${element.description}
                    </p>
                    <p class="post-date">
                      ${element.date} назад
                    </p>
                  </li>
                
                </ul>
              </div>`

    
});

appEl.innerHTML = appHtml;

renderHeaderComponent({
    element: document.querySelector(".header-container"),
});

for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
        goToPage(USER_POSTS_PAGE, {
            userId: userEl.dataset.userId,
        });
    });
}

const likeEventListener = () => {
    const likeButtons = document.querySelectorAll(".like-button");

    likeButtons.forEach(likeButton => {
        likeButton.addEventListener("click", (event) => {
event.stopPropagation();
const postId = likeButton.dataset.postId;
const index = likeButton.dataset.index;
const postHeader = document.querySelector('.post-header');
const userId = postHeader.dataset.userId;
likeButton.classList.add("shake-bottom");

if (posts[index].isLiked) {
    deleteLike( {token: getToken(), postId})
    .then(() => {
        posts[index].isLiked = false;
    })
    .then(() => {
        getPosts({ token: getToken(), userId})
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
        getPosts({token: getToken(), userId})
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
likeEventListener();
}
 
   