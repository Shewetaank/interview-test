import React from 'react';
import { useState } from 'react';
import '../index.css';
import styled from 'styled-components';
import UsersData from './UsersData';
import { CallableUserData, FormData } from './Model';

const StyledDiv = styled.div`
    padding-left: 240px;
    padding-top: 0px;
    width: 100%;
    display: flex;
    height: 100%;
`;

const StyledDivBox = styled.div`
    background-color: white;
    width: fit-content;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 30px 30px;
    margin-left: 20px;
    margin-right: 40px;
    height: fit-content;
`;

const StyledFormGroup = styled.div`
    position: relative;
    min-height: 3.5em;
    padding-top: 10px;
    display: flex;
`;

const StyledInputFormControl = styled.input`
    height: 3em;
    width: 240px;
    border-color: lightgray;
    border-radius: 5px;
    padding-left: 40px;
`;

const FormControlLabel = styled.label`
    position: absolute;
    left: 5px;
    padding-top: 12px;
    color: lightgray;
`;

const SubmitButton = styled.button`
    background-color: #088A29;
    border: none;
    padding: 12px 15px;
    color: white;
    border-radius: 25px;
    margin-top: 10px;
`;

const ErrorText = styled.p`
    color: red;
`;

export default function UsersForm() {
    // initial state to start with.
    const [formData, setFormData] = useState<FormData>(new FormData(0, 120, false));
    const userRef = React.useRef<CallableUserData>(null);

    const updateForm = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: parseInt(value) }));
    }

    const showErrors = (status: boolean) => {
        setFormData((prevFormData) => ({ ...prevFormData, showErrors: status }));
    }

    const handleMinChange = (event: any) => {
        updateForm(event);
        if (parseInt(event.target.value) <= formData.maxAge) {
            userRef.current?.refineSearch(parseInt(event.target.value), formData.maxAge);
            showErrors(false);
        } else {
            showErrors(true);
        }
    };

    const handleMaxChange = (event: any) => {
        updateForm(event);
        if (formData.minAge <= parseInt(event.target.value)) {
            userRef.current?.refineSearch(formData.minAge, parseInt(event.target.value));
            showErrors(false);
        } else {
            showErrors(true);
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (formData.minAge > formData.maxAge) {
            showErrors(true);
        } else {
            showErrors(false);
            userRef.current?.refineSearch(formData.minAge, formData.maxAge);
        }
    };

    return (
        <StyledDiv>
            <StyledDivBox>
                {formData.showErrors ? <ErrorText>Invalid min and max range.</ErrorText> : null}
                <form onSubmit={handleSubmit}>
                    <StyledFormGroup>
                        <StyledInputFormControl name="minAge" value={formData.minAge} type="number" onChange={handleMinChange} />
                        <FormControlLabel>Min</FormControlLabel>
                    </StyledFormGroup>
                    <StyledFormGroup>
                        <StyledInputFormControl name="maxAge" value={formData.maxAge} type="number" onChange={handleMaxChange} />
                        <FormControlLabel>Max</FormControlLabel>
                    </StyledFormGroup>
                    <SubmitButton type="submit">Retrieve Users</SubmitButton>
                </form>
            </StyledDivBox>
            <UsersData ref={userRef} />
        </StyledDiv>
    )
}