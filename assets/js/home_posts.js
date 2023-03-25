{
    //method to submit form data for new post using AJEX
    let createPost = () => {
        let newPostForm = $('#new-post-form');
        newPostForm.submit((e) => {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: (data) => {
                    let newPost = newPostDOM(data.data.post);
                    $('#posts').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));// to add delete link in every created post by calling deletePost Function
                    noty('success', 'Post Created');
                },
                error: (err) => {
                    console.log(err.responseText);
                    noty('error', err);
                }
            })
        })
    }
    //METHOD TO CREATE POST IN DOM
    let newPostDOM = (post) => {
        return $(`<li class="post" id="post-${post._id}">
                    <span>
                        <small class="delete-post"><a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="fa-solid fa-trash"></i></a></small>
                        <p>${post.user.name}</p>
                        <p>${post.content}</p>
                    </span>
                    <span class="like-share-comment">
                        <i class="fa-regular fa-heart"></i>
                        <i class="fa-regular fa-comment"></i>
                        <i class="fa-solid fa-share"></i>
                    </span>
                    <span class="bookmark"><i class="fa-regular fa-bookmark"></i></span>
                    <span class="comment">
                        <form action="/comments/create" method="post" id="comment-form">
                            <textarea name="content" placeholder="Write a comment" cols="30" rows="1"></textarea>
                            <input type="hidden" name="post" value="${post._id}">
                            <button type="submit">Comment</button>
                        </form>
                        <span class="post-comment-list">
                            <ul class="post-comments-${post._id}">
                                
                            </ul>
                        </span>
                    </span>
                </li>`)
    }
    // method to delete the post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                    noty('success', 'Post Deleted!');
                }, error: function (err) {
                    console.log(error.responseText);
                    noty('error', err);
                }
            })
        })
    }

    let noty = function (type, msg) {
        let n = new Noty({ text: msg });
        n.show();
        n.setTimeout(1500);
        n.setTheme('metroui');
        n.setType(type);
    }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function () {
        $('#posts-list-container>ul>li').each(function () {
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }




    createPost();
    convertPostsToAjax();
}