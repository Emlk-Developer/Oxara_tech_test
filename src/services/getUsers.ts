import React from 'react'


// const APIrequest = 'https://randomuser.me/api/?results=10';

export const getUsers = async (noOfUsers:number) => {
    try {
        const request = await fetch(`https://randomuser.me/api/?results=${noOfUsers}`);
        const response = await request.json();

        if(!request.ok) throw Error()
            return response.results;
    } catch {
        throw Error('No users found');
    }
}