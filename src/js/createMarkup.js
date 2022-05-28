import SimpleLightbox from "simplelightbox";

let marginImgCard = '';
let widthImages = '';

const gallery = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery__item', 
{captionsData: "alt", captionDelay: 250,});


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


  export {createMarkup}