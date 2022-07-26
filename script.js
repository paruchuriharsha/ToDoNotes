(function(window, document, undefined){
  let store = {};
    window.onload = init;    
      function init(){       
        document.getElementById('sendbtn').addEventListener('click',sendValue);
        document.getElementById('posts').addEventListener('click',delNode);
      } 

      function sendValue(e){
        const title = (document.getElementById('title').value);
        const text = (document.getElementById('text').value);
        if(text.replace(/\s+/g,'').length==0) return;
        var post = {
          id: "post-div-"+ Date.now(),
          title: title,
          text: text
        }
        document.getElementById('title').value = "";
        document.getElementById('text').value = "";

        element = createPostElement(post);
        const posts = document.getElementById('posts');
        if(posts.firstChild){
        posts.insertBefore(element,posts.firstChild);
        }
        else posts.appendChild(element);
    }

    function delNode(e){
      let target = e.target;
      if(target.className == 'post-del'){
        id = (target.parentNode.parentNode.parentNode.id);
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
        return element;
      }   
})(window, document, undefined);