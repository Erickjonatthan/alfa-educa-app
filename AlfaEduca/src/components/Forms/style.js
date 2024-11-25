import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const Button = styled.button`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

export const Title = styled.h2`
    margin-bottom: 20px;
`;