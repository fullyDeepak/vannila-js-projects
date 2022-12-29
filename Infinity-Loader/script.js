const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArr = [];

//Check if all images were loaded
function imageLoaded(){
   imagesLoaded++;
   if (imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true;   
   }
}

//Helper function to Set Attributes on DOM elements
function setAttribute(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


//Create elements for links & photos and add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArr.length;
    photosArr.forEach((photo) => {
        //Creating <a> to link to Unsplash
        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html,
            targer: '_blank',
        });

        //Create <img> for photos
        const  img = document.createElement('img');
        setAttribute(item,{
            scr:photo.url.regular,
            alt:photo.alt_description,
            title: photo.alt_description,
        });

        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

const count = 10;
const apiKEY = "HtFAsv1tz5R5O8Scq7Ee-nyOKjeqWHdsZ5CYpZLYzSc";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`;

//Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArr = await response.json();
    displayPhotos();
  } catch (error) {

  }
}


//Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

//On load
getPhotos();
