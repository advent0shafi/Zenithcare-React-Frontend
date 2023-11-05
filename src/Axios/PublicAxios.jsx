import axios from "axios";

const PublicAxios = axios.create({

   baseURL: 'https://www.zenith-care.online/',
    
});

export default PublicAxios;