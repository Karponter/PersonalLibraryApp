// import axios from 'axios';

const LibGenerator = {

    getLibrary: async (libSize) => {
        /*        const URL = 'http://bti/admin/api/?action=getAllCategories';
                const myInit = {
                    method: 'HEAD',
                    mode: 'no-cors',
                };

                const myRequest = new Request(URL, myInit);
                const response = await fetch(myRequest);
                console.log(response);
                return response;
        */
        const result = [];
        for (let i = 0; i < libSize; i++) {
            result.push({
                id: Math.trunc(Math.random() * 100000) * i,
                name: `Book title ${i}`,
                author: `author of book ${i}`,
                date: 123,
                rate: Math.trunc(Math.random() * 100),
                notes: 'Some book',
                imgUrl: `https://picsum.photos/400/400/?image=${Math.trunc(Math.random() * 1000)}`
            });
        }
        return result;
    }
};

export default LibGenerator;