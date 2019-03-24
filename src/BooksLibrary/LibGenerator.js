// import axios from 'axios';

const LibGenerator = {
        getLibrary: async (libSize) => {
            function randomDate(start, end) {
                return (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).getTime();
            }

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

                let imgSrc = `https://picsum.photos/400/400/?image=${Math.trunc(Math.random() * 1000)}`;
                let response = await fetch(imgSrc);
                
                while (response.status !== 200) {
                    imgSrc = `https://picsum.photos/400/400/?image=${Math.trunc(Math.random() * 1000)}`;
                    response = await fetch(imgSrc);
                }

                result.push({
                    id: Math.trunc(Math.random() * 1000000),
                    name: `Book title ${i}`,
                    author: `author of book ${i}`,
                    date: randomDate(new Date(1900), new Date()),
                    read: (Math.random() > 0.5),
                    rate: Math.trunc(Math.random() * 100),
                    notes: 'Some book',
                    imgUrl: imgSrc
                });
            }
            return result;
        }
    }
;

export default LibGenerator;