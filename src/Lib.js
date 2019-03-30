export default function (libSize = 25) {
    function randomDate(start, end) {
        return (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).getTime();
    }

    return [...Array(libSize)].map((element, index)=>{
        return {
            id: Math.trunc(Math.random() * 1000000),
            name: `Book name ${index}`,
            author: `Author name ${index}`,
            date: randomDate(new Date(1900), new Date()),
            read: (Math.random() > 0.5),
            rate: Math.trunc(Math.random() * 100),
            notes: 'Some book',
            imgUrl: 'no img'
        }
    });
}