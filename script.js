(function(window, document, undefined){
  let store = {};
    window.onload = init;    
      function init(){     
        store = getPostsFromStorage();  
        document.getElementById('sendbtn').addEventListener('click',createPost);
        document.getElementById('posts').addEventListener('click',delNode);
        let keys = Object.keys(store);
        keys.forEach(key => {
          createPostElement(store[key]);
        });
      } 

      function createPost(e){
        const title = (document.getElementById('title').value);
        const text = (document.getElementById('text').value);
        if(text.replace(/\s+/g,'').length==0) return;
        var post = {
          id: "post-div-"+ Date.now(),
          title: title,
          text: text
        }
        store[post.id] = post;
        storePostsToStorage(store);
        document.getElementById('title').value = "";
        document.getElementById('text').value = "";
        createPostElement(post);
    }

    function delNode(e){
      let target = e.target;
      if(target.className == 'post-del'){
        id = (target.parentNode.parentNode.parentNode.id);
        delete store[id];
        storePostsToStorage(store);
        removeElement(document.getElementById(id));
      }
    }

    function removeElement(element){
      element.parentNode.removeChild(element);
    }

      function createPostElement(post){
        store[post.id]=post;
        let header = document.createElement('div');
        header.classList.add('post-header');
        header.appendChild(document.createTextNode(post.title));
        let trash = document.createElement('div');
        trash.classList.add('post-del');
        trash.innerHTML = '<img class="post-del"src="images/trash.png" alt="">';
        header.appendChild(trash);
        let element = document.createElement('div');
        element.appendChild(header);
        textNode = document.createElement('div');
        textNode.classList.add('post-scrollable');
        textNode.appendChild(document.createTextNode(post.text));
        element.appendChild(textNode);
        element.classList.add('post');
        element.setAttribute('id', post.id);
        const posts = document.getElementById('posts');
        if(posts.firstChild){
          posts.insertBefore(element,posts.firstChild);
        }
        else posts.appendChild(element);
      }

      function getPostsFromStorage(){
        const postObj = localStorage.getItem('ToDoNotes');
        if(postObj!==undefined && postObj!==null){
          return JSON.parse(postObj);
        }
        else return {};
      }
      
      function storePostsToStorage(object){
        localStorage.setItem('ToDoNotes',JSON.stringify(object));
      }
})(window, document, undefined);