export default function (libSize = 25) {
    function randomDate(start, end) {
        return (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).getTime();
    }
    const bookImages = [
        require('./assets/images/0.jpg'),
        require('./assets/images/1.jpg'),
        require('./assets/images/2.jpg'),
        require('./assets/images/3.jpg'),
        require('./assets/images/4.jpg'),
        require('./assets/images/5.jpg'),
        require('./assets/images/6.jpg'),
        require('./assets/images/7.jpg'),
        require('./assets/images/8.jpg'),
        require('./assets/images/9.jpg')
    ];

    return [...Array(libSize)].map((element, index) => {
        return {
            id: Math.trunc(Math.random() * 1000000),
            name: `Book name ${index}`,
            author: `Author name ${index}`,
            date: randomDate(new Date(1900), new Date()),
            read: (Math.random() > 0.5),
            rate: Math.trunc(Math.random() * 100),
            notes: 'Some book',
            imgUrl: bookImages[Math.trunc(Math.random()*(bookImages.length-1))]
        }
    });
}