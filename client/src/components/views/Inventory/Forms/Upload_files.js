import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Row, message, Col, Upload, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileVideo, faImages, faPaperclip, faVideo } from '@fortawesome/free-solid-svg-icons';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { addMediaFiles } from '../../../../_actions/inventory_actions';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
}

export default function Upload_files() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const currentGem = useSelector(state => state.inventory.CURRENT_SELECTED_GEM);
    const [fileList, setFileList] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [videoList, setvideoList] = useState([]);

    const onChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    }

    const handleChange = (info) => {
        let videolist = [...info.fileList];

        videolist = videolist.slice(-3);

        videolist = videolist.map(video => {
            if(video.response) {
                video.url = video.response.url;
            }
            return video;
        })

        setvideoList(videolist);
    }

    const handlePreview = async file => {
        if(!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    }

    const handleCancel = () => setPreviewVisible(false);

    const beforeUploadImages = file => {
        const isImage = file.type.split('/')[0] === "image" ? true : false;
        if(!isImage) {
            message.error("You can only upload images");
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if(!isLt2M) {
            message.error('Image must be smaller than 2MB');
        }

        return isImage && isLt2M;
    }

    const beforeUploadVideos = file => {
        const isVideo = file.type.split('/')[0] === "video" ? true : false;
        if(!isVideo) {
            message.error("You can only upload videos");
        }

        const isLt30M = file.size / 1024 / 1024 < 30;
        if(!isLt30M) {
            message.error('Videos must be smaller than 30MB');
        }

        return isVideo && isLt30M;
    }

    const customRequestImages = options => {
        const { file, data, onProgress, onSuccess, onError } = options;

        let formData = new FormData();

        const config = {
            headers: { "content-type" : "multipart/form-data"},
            onUploadProgress: event => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                if(percent === 100) {
                    console.log("Uploaded successfully...")
                }
                onProgress({percent: (event.loaded / event.total) * 100 });
            }
        }

        formData.append("action", "add_images");
        formData.append("stone_Id", currentGem.stone_Id);
        formData.append("images", file);

        dispatch(addMediaFiles(currentGem._id, formData))
            .then(response => {
                if(response.success == false) {
                    onError("Failed to upload");
                }
                onSuccess('Ok');
            })
            .catch(err => {
                console.error("Error: ", err);
                const error = new Error("Failed to upload");
                onError({err});
            })
    }

    const customRequestVideos = options => {
        const { file, data, onProgress, onSuccess, onError } = options;

        let formData = new FormData();

        const config = {
            headers: { "content-type" : "multipart/form-data"},
            onUploadProgress: event => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                if(percent === 100) {
                    console.log("Uploaded successfully...");
                }
                onProgress({percent: (event.loaded / event.total) * 100 });
            }
        }

        formData.append("action", "add_videos");
        formData.append("stone_Id", currentGem.stone_Id);
        formData.append("videos", file);

        dispatch(addMediaFiles(currentGem._id, formData))
            .then(response => {
                if(response.success == false) {
                    onError("Failed to upload");
                }
                onSuccess('Ok');
                // dispatch(addUploaded(response.payload))
            })
            .catch(err => {
                console.error("Error: ", err);
                const error = new Error("Failed to upload");
                onError({err});
            })
    }


    return (
        <div>
            <Form form={form} labelCol={{span:4}}>
                <Row>
                    <Col span={24}>
                        <fieldset>
                            <legend>
                                <FontAwesomeIcon icon={faImages} style={{ marginRight: 10 }} />Attach image files of the gem
                            </legend>
                        </fieldset>
                    </Col>
                    <Col span={24}>
                        <ImgCrop rotate>
                            <Upload
                                name="images"
                                customRequest={customRequestImages}
                                beforeUpload={beforeUploadImages}
                                progress={{
                                    strokeColor: {
                                        '0%': '#108ee9',
			                            '100%': '#87d068',
                                    },
                                    strokeWidth: 3,
			                        format: percent => `${parseFloat(percent.toFixed(2))}%`
                                }}
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={handlePreview}
                            >
                                {fileList.length < 5 &&  <div style={{textAlign:"center"}}><FontAwesomeIcon icon={faPaperclip} style={{fontSize:18}} /> <br/> Upload</div>}
                            </Upload>
                        </ImgCrop>
                    </Col>
                </Row>
                

                <Row>
                    <Col span={24}>
                         <fieldset>
                            <legend>
                                <FontAwesomeIcon icon={faFileVideo} style={{ marginRight: 10 }} />Attach video files of the gem
                            </legend>
                        </fieldset>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="videosFiles">
                            <Upload
                                name="videos"
                                customRequest={customRequestVideos}
                                beforeUpload={beforeUploadVideos}
                                progress={{
                                    strokeColor: {
                                        '0%': '#108ee9',
			                            '100%': '#87d068',
                                    },
                                    strokeWidth: 3,
			                        format: percent => `${parseFloat(percent.toFixed(2))}%`
                                }}
                                multiple={true}
                                fileList={videoList}
                                onChange={handleChange}
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>
                       
                    </Col>
                </Row>   
               
            </Form>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
                onOk={handleCancel}
            >
                <img alt="image" style={{width:"100%", height:"auto"}} src={previewImage} />
            </Modal>
        </div>
    )
}
