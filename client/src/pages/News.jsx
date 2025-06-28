import {useEffect,useState} from 'react';
import {getNews} from '../api/news';

export default function News(){
    const [newsList,setNewsList]=useState([]);

    useEffect(()=>{
        getNews().then(data=>setNewsList(data));
    },[]);

    return(
        <div className="px-4 py-4 sm:p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center sm:text-left">Latest News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {newsList.map((item)=>(
                    <div key={item._id} className="bg-white p-3 sm:p-4 rounded shadow-md">
                        <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
                        <img src="{item.image}" alt="News" className="my-2 w-full h-36 sm:h-40 md:h-48 object-cover rounded" />
                        <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>  

        </div>
    );
}