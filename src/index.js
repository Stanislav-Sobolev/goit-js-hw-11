import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery__item', 
{captionsData: "alt", captionDelay: 250,});

let queryToFind = '';
let pageData = 1;
let perPage = 195;
let marginImgCard = '';
let widthImages = '';
let totalHitsMax = '';
let totalHits = perPage;

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

loadMore.style.display = 'none';

loadMore.addEventListener('click', async () => {
  pageData += 1;
  totalHits += perPage;

try {
  const uploadPhotoDone = await uploadPhoto();
  createMarkup(uploadPhotoDone);
  if (totalHits > totalHitsMax){
    throw "We're sorry, but you've reached the end of search results.";
  } 
  
} catch (error) {
  Notify.info("We're sorry, but you've reached the end of search results.");
  loadMore.style.display = 'none';
  }
})

form.addEventListener('input', textFromInput);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    loadMore.style.display = 'none';
    pageData = 1;
    gallery.innerHTML = '';
    
    const uploadPhotoDone = await uploadPhoto();
    createMarkup(uploadPhotoDone);
    loadMore.style.display = 'block';
    
})


function textFromInput(text) {
  queryToFind = text.target.value;    
}

async function uploadPhoto() {
  try {
    const getData = await axios.get(`https://pixabay.com/api/?key=27697156-dc70d52aa76d1b34fad0e72d3&q=${queryToFind}
        &image_type=photo&orientation=horizontal&safesearch=true&page=${pageData}&per_page=${perPage}`);

    if (getData.data.hits.length === 0) {
      throw getData.status;
      
    }
    totalHitsMax = getData.data.totalHits;
    
    const arrayFromData = getData.data.hits;
    
   return arrayFromData;
    
  
   } catch (error) {
    
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    
   }
}


function createMarkup(arrayForMarkup) {
  if (gallery.clientWidth > 1100) {
    marginImgCard = 5;  
    widthImages = (gallery.clientWidth / 4) - (marginImgCard * 3);
  } else {
    marginImgCard = 5;  
    widthImages = (gallery.clientWidth / 3) - (marginImgCard * 4);
  }
  
  const markupTemplate = arrayForMarkup.map(el => {
      return `<div class="photo-card" style=" margin:${marginImgCard}px">
      <a class="gallery__item" href="${el.largeImageURL}"><img src="${el.webformatURL}" class="img" alt="${el.tags}" loading="lazy" width="${widthImages}px"/></a>
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
    lightbox.refresh();
  
}



