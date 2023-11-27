import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
   const [location, setLocation] = useState([
     22.278688591829415, 70.77066979062346
   ])
  const form1 = useRef()
  //  useEffect(() => {
  //    if (navigator.geolocation) {
  //      navigator.geolocation.getCurrentPosition((position) => {
  //        setLocation({
  //          lat: 22.278688591829415,
  //          lng: 70.77066979062346,
  //        })
  //      })
  //    } else {
  //      console.log('Geolocation is not supported by this browser.')
  //    }
  //  }, [])

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])
 
   const sendEmail = async (e) => {
     e.preventDefault()
     const obj = {}
     const formData = new FormData(form1.current)
     for (let pair of formData.entries()) {
       obj[pair[0]] = pair[1]
     }

     try {
       const response = await fetch(
         `https://auraelevatorsbackend.netlify.app/.netlify/functions/api/contect`,
         {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(obj),
         }
       )

       const data = await response.json()
     

       if (data.status) {
          alert('Message successfully sent!')
       } else {
         alert(data.msg)
       }

      
     } catch (error) {
     
       console.error(error)
      
     }

     emailjs
       .sendForm(
         'service_59ia2bs',
         'template_kw2cqg',
         form1.current,
         'WS-f8MsRXA2wpTytu',
         {
           name: obj?.name || '',
           email: obj?.email || '',
           subject: obj?.subject || '',
           message: obj?.message || '',
         }
       )
       .then(
         () => {
           alert('Message successfully sent!')
           // window.location.reload(false)
         },
         () => {
           alert('Failed to send the message, please try again')
         }
       )
   }

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            I am interested in freelance opportunities - especially on ambitious
            or large projects. However, if you have any other requests or
            questions, don't hesitate to contact me using below form either.
          </p>
          <div className="contact-form">
            <form ref={form1} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input placeholder="Name" type="text" name="name" required />
                </li>
                <li className="half">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div className="info-map">
          Block No 37 ,
          <br />
          Narayan Nager,
          <br />
          opp. Satya Sai Heart Hospital
          <br />
          Kalawad Road Rajkot-360005 <br />
          <br />
          <span>monil.nariya@gmail.com</span>
        </div>
        <div className="map-wrap">
          <MapContainer center={location} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location}>
              <Popup>Monil lives here, come over for a cup of coffee :)</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
