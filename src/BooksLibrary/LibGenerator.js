const LibGenerator = {
        randomDate: (start, end) => {
            return (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).getTime();
        },
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
            // const init = {
            //     method: 'GET',
            //     mode: 'no-cors'
            // };
            let booksData = [];
            const url = 'https://cors-anywhere.herokuapp.com/https://www.poemist.com/api/v1/randompoems';
            while (booksData.length < libSize) {
                booksData = booksData.concat(await (await fetch(url)).json());
                console.log(`Fetched: ${booksData.length} books.`);
            }

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
                    name: booksData[i].title,
                    author: booksData[i].poet.name,
                    date: LibGenerator.randomDate(new Date(1900), new Date()),
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