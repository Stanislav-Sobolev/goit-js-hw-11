import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "simplelightbox/dist/simple-lightbox.min.css";
import {createMarkup} from './js/createMarkup';
import {uploadPhoto} from './js/getData';

let queryToFind = '';
let pageData = 1;
let perPage = 40;
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
    const uploadPhotoDone = await uploadPhoto(queryToFind, pageData, perPage);
    const uploadPhotoDoneArray = uploadPhotoDone.hits;
    totalHitsMax = uploadPhotoDone.totalHits;

    createMarkup(uploadPhotoDoneArray);
    
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
    
    const uploadPhotoDone = await uploadPhoto(queryToFind, pageData, perPage);
    const uploadPhotoDoneArray = uploadPhotoDone.hits;
    totalHitsMax = uploadPhotoDone.totalHits;
    
    createMarkup(uploadPhotoDoneArray);
    loadMore.style.display = 'block';
    
})


function textFromInput(text) {
  queryToFind = text.target.value;    
}








