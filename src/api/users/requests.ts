import { Album } from "../albums/requests";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: number;
        lng: number;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }
  
  export async function getUsers() {
    const respone = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data: User[] = await respone.json();
    const users = data.map((user) => ({
      ...user
    })); //destrukcja
    return users;
  }
  
  export async function getUser(userId: string) {
    const respone = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const data: User = await respone.json();
    const user = {
      ...data
    };
    return user;
  }
  
  export async function getUserAlbums(userId: string) {
    const respone = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/albums`
    );
    const data: Album[] = await respone.json();
    return data;
  }