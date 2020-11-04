import React from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {Button} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import CommentIcon from '@material-ui/icons/Comment';

class ContactUsForm extends React.Component
{
    constructor(props){
        super();
        this.state={
            name:"",
            email:"",
            message:""
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        // console.log(e.target.value);
    }

    handleSubmit= async(event)=>{
        event.preventDefault()
        alert("Your message has been sent.We will get back shortly")
        this.setState({
            name:"",
            email:"",
            message:""
        })
    

    }

    render(){
        return(
            <div>
            <ValidatorForm onSubmit={this.handleSubmit}>
                
                    <TextValidator label="Name" name="name" variant="outlined"
                    type="text" style={{width:"100%",marginBottom:"5%"}} onChange={this.onChange}
                    value={this.state.name} color='primary'
                    validators={['required']}
                    errorMessages={['this field is required']}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end' style={{ padding: '12px' }}>
                                <PersonIcon />
                            </InputAdornment>
                        )
                    }}
                    />

                    

                    <TextValidator label="Email id" name="email" variant="outlined" 
                    type="text" style={{width:"100%",marginBottom:"5%"}} onChange={this.onChange}
                    value={this.state.email} color='primary'
                    validators={['required']}
                    errorMessages={['this field is required']}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end' style={{ padding: '12px' }}>
                                <EmailIcon />
                            </InputAdornment>
                        )
                    }}
                    />

                  

                    <TextValidator label="Your message" name="message" variant="outlined" multiline rows={4}
                    type="text" style={{width:"100%",marginBottom:"5%"}} onChange={this.onChange}
                    value={this.state.message} color='primary'
                    validators={['required']}
                    errorMessages={['this field is required']}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end' style={{ paddingBottom: '45px', paddingRight:"12px" }}>
                                <CommentIcon/>
                            </InputAdornment>
                        )
                    }}
                    />
               
                    <Button style={{marginTop:"1%"}} color="secondary" type="submit" variant="contained">Submit </Button>

            </ValidatorForm>
            </div>
        );
    }
   
}

export default ContactUsForm;