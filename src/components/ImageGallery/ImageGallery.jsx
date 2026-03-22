import "./ImageGallery.css";

const ImageGallery = () => {
  return (
    <div className="kawaii-gallery-horizontal">
      <img
        src="/assets/gallery/img1.jpg"
        alt="Poster 1"
        className="img img-left"
      />

      <img
        src="/assets/gallery/img2.jpg"
        alt="Poster 2"
        className="img img-center"
      />

      <img
        src="/assets/gallery/img3.jpg"
        alt="Poster 3"
        className="img img-right"
      />
    </div>
  );
};

export default ImageGallery;