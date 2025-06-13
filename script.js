const articles = [];
    let currentEditIndex = null;

    document.getElementById('articleForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Empêcher le rechargement de la page

        const author = document.getElementById('author').value;
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const profileImage = document.getElementById('profileImage').files[0];
        const imageUrl = URL.createObjectURL(profileImage);

        if (currentEditIndex !== null) {
            // Modifier l'article existant
            articles[currentEditIndex] = { author, title, content, imageUrl };
            currentEditIndex = null;
        } else {
            // Ajouter un nouvel article
            articles.push({ author, title, content, imageUrl });
        }

        updateArticleDisplay();
        resetForm();
    });

    function updateArticleDisplay() {
        const articlesList = document.getElementById('articles');
        articlesList.innerHTML = ''; // Réinitialiser la liste

        articles.forEach((article, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'article-item';
            listItem.innerHTML = `
                <div class="author">
                    <img src="${article.imageUrl}" alt="Avatar">
                    Auteur : ${article.author}
                </div>
                <div class="title">${article.title}</div>
                <p>${article.content}</p>
                <div class="button-group">
                    <button onclick="editArticle(${index})" class="btn-primary">Modifier</button>
                    <button onclick="deleteArticle(${index})" class="btn-danger">Supprimer</button>
                </div>
            `;
            articlesList.appendChild(listItem);
        });

        document.getElementById('articleList').style.display = 'block';
    }

    function editArticle(index) {
        currentEditIndex = index;
        const article = articles[index];

        document.getElementById('author').value = article.author;
        document.getElementById('title').value = article.title;
        document.getElementById('content').value = article.content;

        // Afficher l'article à modifier
        document.getElementById('articleDisplay').style.display = 'block';
        document.getElementById('displayTitle').innerText = article.title;
        document.getElementById('displayContent').innerText = article.content;
    }

    function deleteArticle(index) {
        articles.splice(index, 1); // Supprimer l'article
        updateArticleDisplay(); // Mettre à jour l'affichage
    }

    function resetForm() {
        document.getElementById('articleForm').reset();
        document.getElementById('articleDisplay').style.display = 'none';
        document.getElementById('showFormButton').style.display = 'block';
    }

    document.getElementById('showFormButton').addEventListener('click', function() {
        resetForm();
    });

    document.getElementById('listArticlesButton').addEventListener('click', function(event) {
        event.preventDefault(); // Empêcher le rechargement de la page
        updateArticleDisplay();
    });