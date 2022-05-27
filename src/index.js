import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

let queryToFind = '';
let pageData = 1;

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more')

form.addEventListener('input', textFromInput);
loadMoreBtn.addEventListener('click', () => {
    pageData += 1;
    console.log(pageData);
})

function textFromInput(text) {
    queryToFind = text.target.value;    
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    pageData = 1;
    
    axios.get(`https://pixabay.com/api/?key=27697156-dc70d52aa76d1b34fad0e72d3&q=${queryToFind}
        &image_type=photo&orientation=horizontal&safesearch=true&page=${pageData}&per_page=4`)
    .then(response => {
        
        return response.data.hits;
        
    })
    .then(markup => {
        const widthImages = (innerWidth / 4) -30;
        console.log(widthImages);
        
        
      const markupTemplate = markup.map(el => {
            return `<div class="photo-card">
            <a href="${el.largeImageURL}"><img src="${el.webformatURL}" class="img" alt="${el.tags}" loading="lazy" width="${widthImages}px"/></a>
            <div class="info" style="width:${widthImages}px">
              <p class="info-item">
                <b>Likes</b>
                <span>${el.likes}</span>
              </p>
              <p class="info-item">
                <b>Views</b>
                <span>${el.views}</span>
              </p>
              <p class="info-item">
                <b>Comments</b>
                <span>${el.comments}</span>
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <span>${el.downloads}</span>
              </p>
            </div>
          </div>`
        }).join('');
        
        gallery.insertAdjacentHTML('beforeend', markupTemplate)

    })
    .catch(error => {
        // handle error
        console.log(error);
    });


})






