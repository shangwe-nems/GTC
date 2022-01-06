import React, { useState, useEffect, useRef } from 'react'
import Slider from 'react-slick';
import { Divider, Button, Modal, Image, Form } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slider.css';
import { faFileImage, faFileVideo, faImages, faPaperclip, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import Upload_files from './Forms/Upload_files';
import { GET_FILE_SERVER } from '../../Config';

export default function ImageSlider({stoneID, videoFiles, imageFiles}) {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const slider1 = useRef(null);
    const slider2 = useRef(null);
    const [images, setimages] = useState([]);
    const [videos, setvideos] = useState([]);
    const [visible, setvisible] = useState(false);
    const [visibleVideo, setVisibleVideo] = useState(false);
    const [currentViewed, setcurrentViewed] = useState(null);
  
    useEffect(() => {
      setNav1(slider1.current);
      setNav2(slider2.current);
      setimages(imageFiles);
      setvideos(videoFiles);
    }, []);

    return (
        <Form style={{padding: '0px 10px', marginTop:20}}>
            <fieldset>
                <legend>
                    <FontAwesomeIcon icon={faImages} style={{ marginRight: 10 }} /> Images of the current gem
                </legend>
            </fieldset>
            <div style={{ display:"inline-flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap"}}>
                {imageFiles.length > 0 ? (<>
                    {imageFiles.map((img, index) => (
                        <div key={img.concat(index.toString(), stoneID)} style={{width:100, height:100, padding:5, border:"1px dashed #a6a6a6", margin:5, borderRadius:8}}>
                            <Image src={`${GET_FILE_SERVER.concat('/', img)}`} alt="" style={{borderRadius:8}} />
                        </div>
                    ))}
            </>) : (
                <div style={{width:"100%", height:180, display:"grid", placeContent:"center"}}>
                    <span><FontAwesomeIcon icon={faFileImage} style={{fontSize:50}}/><br/>No images</span>
                </div>
            )}
            </div>
            <Divider />
            <fieldset>
                <legend>
                    <FontAwesomeIcon icon={faFileVideo} style={{ marginRight: 10 }} /> Videos of the current gem
                </legend>
            </fieldset>
            <div style={{ display:"inline-flex", justifyContent:"stretch", alignItems:"center", flexWrap:"wrap"}}>
                {videoFiles.length > 0 ? (<>
                    {videoFiles.map((img, index) => (
                        <div key={img} style={{width:205, height:"auto", border:"1px dashed #a6a6a6", padding:"5px 5px 0px 5px",  margin:5, borderRadius:8}}>
                            <video width="100%" height="auto" poster={require('../../assets/img/placeholder.jpg')} onClick={() => {setVisibleVideo(true); setcurrentViewed(img);}}>
                                <source src={`${GET_FILE_SERVER.concat('/', img)}`} type="video/mp4" />
                            </video>
                        </div>
                    ))}
            </>) : (
                <div style={{width:"100%", height:180, display:"grid", placeContent:"center"}}>
                    <span><FontAwesomeIcon icon={faFileVideo} style={{fontSize:50}}/><br/>No videos</span>
                </div>
            )}
            </div>
            <Divider />
            <Button type="primary" onClick={() => setvisible(true)}><FontAwesomeIcon icon={faPaperclip} style={{marginRight:10}} />Attach files</Button>


            <Modal
                visible={visible}
                onCancel={() => setvisible(false)}
                onOk={() => setvisible(false)}
                footer={null}
                width={650}
                destroyOnClose={true}
            >
                <h2 style={{fontWeight: "lighter", color: "green"}}><FontAwesomeIcon icon={faPaperclip} style={{marginRight:10}} /> Attach images and videos</h2>
                <p style={{color:"#a6a6a6", fontSize:14}}>This window allows the user to attach images or videos to already recorded gems in the system, and this is concern each stone inidividually. </p>
                <Upload_files />
            </Modal>
            <Modal
                visible={visibleVideo}
                onCancel={() => {setVisibleVideo(false); setcurrentViewed(null)}}
                onOk={() => {setVisibleVideo(false); setcurrentViewed(null)}}
                destroyOnClose={true}
                footer={null}
            >
                <div style={{textAlign:"center"}}>
                    <video width="400" height="auto" controls>
                    <source src={`${GET_FILE_SERVER.concat('/', currentViewed)}`} type="video/mp4" />
                </video>
                </div>
                
            </Modal>
        </Form>
    )
}




