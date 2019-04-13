export default function (libSize = 25) {
    function randomDate(start, end) {
        return (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).getTime();
    }
    const bookImages = [
        '/assets/images/0.jpg',
        '/assets/images/1.jpg',
        '/assets/images/2.jpg',
        '/assets/images/3.jpg',
        '/assets/images/4.jpg',
        '/assets/images/5.jpg',
        '/assets/images/6.jpg',
        '/assets/images/7.jpg',
        '/assets/images/8.jpg',
        '/assets/images/9.jpg'
    ];

    const location = window.location.href.replace(/\/$/,'');

    return [...Array(libSize)].map((element, index) => {
        return {
            id: Math.trunc(Math.random() * 1000000),
            name: `Book name ${index}`,
            author: `Author name ${String.fromCharCode(97+index)}`,
            date: randomDate(new Date(1900), new Date()),
            read: (Math.random() > 0.5),
            rate: Math.trunc(Math.random() * 100),
            notes: 'Some book',
            imgUrl: location + bookImages[Math.trunc(Math.random() * (bookImages.length - 1))]
        }
    });
}