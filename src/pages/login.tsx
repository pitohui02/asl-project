import React from "react"
import { Typography, Box, Paper, TextField, Button, Divider } from "@mui/material"
import Image from "next/image"

import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'

import styles from '../styles/login.module.css'

import axios from 'axios';

import { withRouter } from "next/router"


class LoginPage extends React.Component<any, any >{

    constructor(props: any) {
        super(props);

        this.state = {

            username: '',
            password: '',

            userCreds: new Map([['TestUser', 'MyVeryOwnTestPassword123$']]),

        }
    }

    handleLogin = () => {
        const { username, password } = this.state;

        axios.post(`${process.env.apiUrl}/account/login`, { username, password }).then(res => {
            localStorage.setItem("jwt", `Bearer ${res.data}`);
            axios.interceptors.request.use(
                config => {
                //   const {origin} = new URL(config.url);
                  const allowedOrigins = [process.env.apiUrl];
          
                  if (allowedOrigins.includes(origin)) {
                    config.headers["Authorization"] = `Bearer ${res.data}`
                  }
                  return config;
                },
                error => {
                  return Promise.reject(error);
                }
              );
            this.props.router.push('/dashboard')
        }).catch(e => console.log(e));
    }

    handleUsernameData = (event: any) => {
        this.setState({username: event.target.value })
    }

    handlePasswordData = (event: any) => {
        this.setState({password: event.target.value })
    }


    render() {
        return(
            <>
                    <Box className = {styles.centerscreen}>
                        <Paper className = {styles.paperdesign} elevation={12}>
                            
                            <Box className = {styles.mainbox}>

                                <Box className = {styles.gridchild1}>
                                    <Image 
                                    src = "/barangay_logo.png"
                                    alt = "placeholder"
                                    width = {250}
                                    height = {250}
                                    className = {styles.imageDesign}
                                    />
                                </Box>


                                <Box className = {styles.gridchild2}>
                                    
                                    <Box>

                                        <Typography variant = "h4" className = {styles.titledesign}>BARANGAY 15</Typography>
                                        
                                        <Divider variant = "middle"/>
                                        
                                        <Typography variant = "h6" className = {styles.subdesign}>Certificate Issuance System</Typography>


                                    </Box>

                                    <Box className ={styles.fieldDesign}>
                                        
                                        <PersonIcon fontSize="medium" className = {styles.iconstyle}/> 
                                        
                                        <TextField 
                                            id="username" 
                                            label="Username" 
                                            variant="outlined"
                                            onChange={this.handleUsernameData}
                                            size="small"
                                        />

                                    </Box>

                                    <Box>

                                        <LockIcon fontSize="medium" className = {styles.iconstyle}/> 

                                        <TextField 
                                            id="password" 
                                            label="Password" 
                                            variant="outlined" 
                                            type="password" 
                                            onChange={this.handlePasswordData}
                                            size = "small"
                                        /> 
                                        
                                    </Box>

                                    <Box>
                                    
                                    <Button 
                                    variant= "contained" 
                                    type = "submit"
                                    className = {styles.buttonstyle}
                                    onClick={this.handleLogin}> LOG IN
                                    </Button>    
                            
                                    </Box>

                                </Box>


                            </Box>
  
                        </Paper>

                    </Box>
                    
                
                   
            </>

        )
    }
}

export default withRouter(LoginPage)