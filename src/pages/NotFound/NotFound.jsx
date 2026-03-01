import './NotFound.css'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <section className='not-found'>
      <h2>404 😕</h2>
      <p>Ooops! We can't find that page...</p>
      <button 
        className="home-btn" 
        onClick={() => navigate('/')}
      >
        Back
      </button>
    </section>
  )
}

export default NotFound
