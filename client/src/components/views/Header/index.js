import React, {useState, useEffect} from 'react'
import { Tooltip, Avatar, Dropdown, Menu, Badge, Affix, message, notification, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandArrowsAlt, faUser, faUsers, faCogs, faSignOutAlt, faBell, faChevronDown, faSolarPanel } from '@fortawesome/free-solid-svg-icons';
import { withRouter, Link, useHistory } from 'react-router-dom';
import styles from "./header.module.css";
import Sidebar from '../Sidebar';
import { logoutUser } from '../../../_actions/user_actions';
import Profile from './Settings/Profile';
import Settings from './Settings/Settings';


function Header(props) {
    const dispatch = useDispatch();
    const [fullscreen, setfullscreen] = useState(false);
    const userData = useSelector(state => state.user.userData);
    const [visibleSettings, setvisibleSettings] = useState(false);
    const [visibleProfile, setvisibleProfile] = useState(false);
    const [user, setUser] = useState(undefined);
    const history = useHistory();

    useEffect(() => {
        setUser(userData && userData !== undefined ? userData : undefined);
    }, [userData]);


    const setFullScreen = () => {
        const fullScreen = fullscreen;
        const element = document.documentElement;
        if (fullScreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                // IE11
                element.msRequestFullscreen();
            }
        }
        setfullscreen(!fullscreen);
    }

    const handleLogout = () => {
		dispatch(logoutUser())
			.then(response => {
				if (response.payload.success) {
					
					console.log('logout successfull');
					localStorage.removeItem('ms_username');
					history.push('/login');
					setTimeout(() => {
                        notification["success"]({
                            message: "Logout Successfull",
                            description: 'Your session has been discarded!!',
                            placement:"bottomRight"
                        });
                    }, 2000);
				} else {
					message.error("Log out failed!!");
				}				
			})
			.catch(err => {
				console.error("Log out failed : ", err);
				// message.error('Log out failed!!');
			});
		
	};

    return (
        <>
            <Affix offsetTop={0}>
                <div className={styles.header}>
                    <div className={styles.headerLogo}>
                        <div className={styles.logo} >
                            <img src={require('../../assets/img/logo.png')} alt="" style={{ width: 60, height: '100%', marginRight: 15 }} />
                            <div style={{display:'flex', flexDirection:'column', padding: 0, margin: 0}}>
                                BINJA FLORA
                                <span style={{fontSize:21, margin:0, marginTop: -10, fontWeight:300}}>SARL</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.headerCenter}>
                        <Sidebar />
                    </div>
                    <div className={styles.headerRight}>
                        <div className={styles.headerUserCon}>
                            <div className={styles.btnFullscreen} style={{marginRight:20}}>
                                <Badge count={5} style={{ background: "#DB1539", fontSize: 10 }}>
                                    <FontAwesomeIcon icon={faBell} style={{ fontSize: 32 , color:'#40AB37'}}  />
                                </Badge>
                            </div>
                            <Tooltip title={fullscreen ? 'Réduire' : 'Etendre'} placement="bottom">
                                <div className={styles.btnFullscreen} onClick={setFullScreen}>
                                    <FontAwesomeIcon icon={faExpandArrowsAlt} style={{fontSize: 32, color:'#40AB37'}} /> 
                                </div>
                            </Tooltip>

                            <Avatar className={styles.userAvator} src={require("../../assets/img/no-user.jpg")} />

                            <Dropdown
                                className={styles.userName}
                                trigger={["click"]}
                                overlay={
                                    <Menu style={{ width: 250 }}>
                                        <Menu.Item key="info" disabled>
                                            <span style={{width:"100%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:10}}>
                                                <Avatar src={require('../../assets/img/no-user.jpg')} size={100} alt="user" style={{marginBottom:10}} />
                                                <h3>{user !== undefined && user ? user.first_name + " " + user.last_name : null}</h3>
                                                <p>{user !== undefined && user ? user.function : null}</p>
                                            </span>
                                        </Menu.Item>
                                        <Menu.Item key="profile" onClick={() => setvisibleProfile(true)}>
                                            <FontAwesomeIcon icon={faUser} style={{marginRight: 10}} />Profile
                                        </Menu.Item>
                                        <Menu.Item key="settings" onClick={() => setvisibleSettings(true)}>
                                            <FontAwesomeIcon icon={faCogs} style={{marginRight: 10}} />Settings
                                        </Menu.Item>
                                        <Menu.Divider />
                                        <Menu.Item key="logout" onClick={() => handleLogout()}>
                                            <FontAwesomeIcon icon={faSignOutAlt} style={{marginRight: 10}} />Logout
                                        </Menu.Item>
                                    </Menu>
                                }
                            >
                                <span style={{display:'inline-flex', alignItems:'center'}}>
                                    <div style={{display:'flex', flexDirection:'column', marginRight: 10}}>
                                        <h4 style={{margin:0, padding:0, fontStyle:'bolder'}}>{user && user!== undefined && user !== null ? user.first_name + " " + user.last_name : null}</h4>
                                        <p style={{margin:0, padding:0, fontSize: 13, color: '#0086E3'}}>{user && user.user_type !== undefined && user !== null ? user.user_type.user_type : null}</p>
                                    </div>
                                    <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: 14 }} />
                                </span>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </Affix>
            <Modal
                visible={visibleProfile}
                onCancel={() => setvisibleProfile(false)}
                onOk={() => setvisibleProfile(false)}
                footer={null}
            >
                <Profile />
            </Modal>
            <Modal
                visible={visibleSettings}
                onCancel={() => setvisibleSettings(false)}
                onOk={() => setvisibleSettings(false)}
                footer={null}
            >
                <Settings />
            </Modal>
        </>
    )
}

export default withRouter(Header)
