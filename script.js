// Adicionar Notícias

const btnAddNoticia = document.querySelector('.add-noticia');
const btnEnviarNoticia = document.querySelector('.enviar-noticia');
const modal = document.querySelector('.modal');
const btnFecharModal = document.querySelector('.fechar-modal');
const tituloNoticia = document.getElementById('titulo-noticia');
const textoNoticia = document.getElementById('texto-noticia');
const dataAtual = document.querySelector('.data-atual');

btnAddNoticia.addEventListener('click', abrirModal);
btnEnviarNoticia.addEventListener('click', addNovaNoticia);

function fecharModal() {
  modal.classList.remove('modal-ativo');
}

function limparInput() {
  tituloNoticia.value = '';
  textoNoticia.value = '';
  dataAtual.value = '';
}

function abrirModal() {
  modal.classList.add('modal-ativo');
  btnFecharModal.addEventListener('click', fecharModal);
}

function addNovaNoticia() {
  if(dataAtual.value == '' || tituloNoticia.value == '' || textoNoticia.value == '') {
    alert('Preencha todos os campos antes de enviar!');
  } else {
    const title = tituloNoticia.value;
    const text = textoNoticia.value;
    const date = dataAtual.value;
    const dataObj = {title, text, date};
    if(localStorage.getItem('items') === null) {
      localStorage.setItem('items', JSON.stringify([dataObj]));
    } else {
    localStorage.setItem('items', JSON.stringify([...JSON.parse(localStorage.getItem('items')), dataObj]))
  } 
  fecharModal();
  limparInput();
  renderItem(dataObj);
  }
}

function renderItem(item) {
  const sectionNoticias = document.querySelector('.noticias');
  const div = document.createElement('div');
  div.classList.add('noticia');
  div.innerHTML = `<span class="data-noticia">${item.date}</span>
  <button class="like"></button>
  <h1 class="titulo-noticia">${item.title}</h1>
  <p class="texto-noticia">${item.text}</p>
</div>`;
sectionNoticias.appendChild(div);
}


const items = JSON.parse(localStorage.getItem('items')) || [];
function getItems() {
  items.forEach(item => renderItem(item));
}

getItems();

// Pesquisar Notícias

function pesquisarNoticia() {
  const noticia = document.querySelectorAll('.noticia');
  const input = document.querySelector('.pesquisar');
  const filter = input.value.toUpperCase();
  noticia.forEach(noticia => {
    const textoValor = noticia.textContent || noticia.innerText;
    if(textoValor.toUpperCase().indexOf(filter) > -1) {
      noticia.style.display = "";
    } else {
      noticia.style.display = "none";
    }
  });
}

// Botão Like

const btnLike = document.querySelectorAll('.like');

btnLike.forEach(like => {
  like.addEventListener('click', (event) => {
    event.currentTarget.classList.toggle('like-ativo');
  });
});