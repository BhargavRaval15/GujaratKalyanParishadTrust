import {useEffect,useState} from 'react';
import {getNews} from '../api/news';

export default function News(){
    const [newsList,setNewsList]=useState([]);

    useEffect(()=>{
        getNews().then(data=>setNewsList(data));
    },[]);

    return(
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {newsList.map((item)=>(
                    <div key={item._id} className="bg-white p-4 rounded shadow-md">
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <img src="{item.image}" alt="News" className="my-2 w-full h-48 object-cover rounded" />
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>  

        </div>
    );
}