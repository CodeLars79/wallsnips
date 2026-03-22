import './About.css'
import ImageGallery from '../../components/ImageGallery/ImageGallery'; 

const About = () => {
  return (
    <div className="about-container fade-section">
      <section className="about-text">
        
        <h2>We believe creativity should be simple and accessible.</h2>

        <ImageGallery /> 
        
        <h2>Your go-to destination for cute, minimalistic poster layouts — no registration required.</h2>

        <p>
          We've always been drawn to clean, evocative graphics — especially when they come with a touch of kawaii charm. 
          That's why we created this mixable collection: so you get to decide what works best for you.
          With a variety of backgrounds, moods, and shapes available across our menus, you can create more than 10.000 
          unique combinations (and more to come) — ready to download and print.
        </p>
        <p>You can download vector-based SVG formats and ready to print A4 JPG formats.</p>
        <p>We curate the base; you do the mix.</p>
        <h2>No AI. All artwork is created by real humans.</h2>
        <p>We believe creativity should feel personal, playful, and real. 
        The joy is in the process — something no machine can truly experience.</p>

        <p>
          If you'd like to support the project and help keep wallsnips running, consider buying from our collections. 
          Sharing the site or giving us a like on social media also goes a long way!
          We're thrilled you found us—and we'd love to see how you use our designs. 
          If you'd like to share your project, send us a sample at: mail@wallsnips.com
        </p>

        <p>Happy mixing!</p>

      </section>
    </div>
  )
}

export default About