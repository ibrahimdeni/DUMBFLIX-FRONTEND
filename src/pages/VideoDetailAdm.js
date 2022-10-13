import React, { useEffect,useState } from "react";
import witcher from '../images/witcher.png'
import inplayww from '../images/inplayww.png'
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../assets/styles/style.css'
import Form from 'react-bootstrap/Form';
import Images from '../assets/Icons/icons'

function VideoDetailAdm() {

  const [isLogin, setIsLogin] =useState(false)

  const navigate = useNavigate()
  // const user = JSON.parse(localStorage.getItem('user'))

  // useEffect(() => {
  //   if(user) setIsLogin(true)
  //   else {
  //     setIsLogin(false)
  //     navigate('/')
  //   }
  // }, [user])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d-flex justify-content-center bg-dark">
        <iframe 
            width="853" 
            height="480" 
            src="https://www.youtube.com/embed/ndl1W4ltcmg" 
            title="THE WITCHER | MAIN TRAILER | NETFLIX" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
        ></iframe>
      </div>

        <div className="d-flex justify-content-end mt-4" style={{ width: '78%'}}>
          <Button variant="danger" onClick={handleShow}>
          Add Episode
          </Button>

          <Modal show={show} onHide={handleClose} className="modalVideo border-0">
            {/* <Modal.Header closeButton className="bg-dark border-0 text-white">
              <Modal.Title className="text-white">Add Episode</Modal.Title>
            </Modal.Header> */}
            <Modal.Body className="text-white bg-dark border-0 text-white">
              <Form.Group className="mb-2 d-flex">
                <Form.Control placeholder="Title" className='me-2 bg-dark titleEps text-white'/>
                <Form.Label className="input-img d-flex justify-content-between w-50">
                  <p>
                    <span style={{ fontSize: '14px'}}>Attach Thumbnail</span>
                  </p>
                  <Form.Control placeholder="Attach Thumbnail" className='addTitle ps-4 w-25' type="file" hidden/>
                  <img src={Images.PaperClip} alt='' className='uploadIcon'/>
                </Form.Label>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control placeholder="Year" className="bg-dark" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="bg-dark border-0">
              <Button variant="danger" onClick={handleClose} className="ps-5 pe-5">
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div className="w-100 bg-black" style={{marginTop:"-50px"}}>
            <div className="d-flex justify-content-start sectionMain mt-5 flex-column flex-md-row bg-black">
                <div className="card mt-5 mb-3 bg-black text-white" style={{ maxWidth: "540px" }}>
                    <div className="row g-0">
                    <div className="col-md-4">
                        <img src={witcher} className="img-fluid rounded-start imgDummyDetail" alt="Series" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                        <h5 className="card-title fs-1">The Witcher</h5>
                        <div className="mb-4 mt-2">
                        <small className="text-muted">2013</small> 
                        <small className='border border-secondary ms-2 px-1 ms-3 py-1 rounded text-muted tv-s shadow'>TV Series</small>
                        </div>
                        <p className="card-text pDetailMain">
                            It is based on the book series of the same name by Polish writer Andrzej Sapkowski. The Witcher follows the story of Geralt of Rivia, a solitary monster hunter, who struggles to find his place in a world where people often prove more wicked than monsters and beasts.                        </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cardEpisode mt-5">
                <img src={inplayww} alt="episode" className="imgEpisode" />
                <small className="text-light">Peaky Blinders : Episode 1</small>
            </div>
            </div>
        </div>
    </>
  );
}

export default VideoDetailAdm;