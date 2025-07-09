import {useEffect,useState} from 'react';
import {getNews} from '../api/news';

export default function News(){
    const [newsList,setNewsList]=useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useEffect(()=>{
        getNews().then(data=>setNewsList(data)).catch(err=>console.error('Error fetching news:', err));
    },[]);

    const openNewsModal = (news) => {
        setSelectedNews(news);
        setCurrentImageIndex(0);
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
        document.body.style.overflow = 'hidden';
    };

    const closeNewsModal = () => {
        setSelectedNews(null);
        setCurrentImageIndex(0);
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
        document.body.style.overflow = 'unset';
    };

    const openImageInNewTab = (imageUrl) => {
        window.open(`http://localhost:5000${imageUrl}`, '_blank');
    };

    const zoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.5, 5));
    };

    const zoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
        if (zoomLevel <= 1) {
            setPanPosition({ x: 0, y: 0 });
        }
    };

    const resetZoom = () => {
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
    };

    const nextImage = () => {
        if (selectedNews && currentImageIndex < selectedNews.images.length - 1) {
            setCurrentImageIndex(prev => prev + 1);
            resetZoom();
        }
    };

    const prevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
            resetZoom();
        }
    };

    const handleMouseDown = (e) => {
        if (zoomLevel > 1) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - panPosition.x,
                y: e.clientY - panPosition.y
            });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && zoomLevel > 1) {
            setPanPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Touch events for mobile
    const handleTouchStart = (e) => {
        if (zoomLevel > 1) {
            const touch = e.touches[0];
            setIsDragging(true);
            setDragStart({
                x: touch.clientX - panPosition.x,
                y: touch.clientY - panPosition.y
            });
        }
    };

    const handleTouchMove = (e) => {
        if (isDragging && zoomLevel > 1) {
            e.preventDefault();
            const touch = e.touches[0];
            setPanPosition({
                x: touch.clientX - dragStart.x,
                y: touch.clientY - dragStart.y
            });
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (selectedNews) {
                switch(e.key) {
                    case 'Escape':
                        closeNewsModal();
                        break;
                    case 'ArrowLeft':
                        prevImage();
                        break;
                    case 'ArrowRight':
                        nextImage();
                        break;
                    case '+':
                    case '=':
                        zoomIn();
                        break;
                    case '-':
                        zoomOut();
                        break;
                    case '0':
                        resetZoom();
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [selectedNews, isDragging, dragStart, panPosition, currentImageIndex, zoomLevel]);

    return(
        <div className="px-4 py-4 sm:p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">📰 Latest News</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {newsList.map((item)=>(
                    <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Newspaper Image */}
                        {item.images && item.images.length > 0 && (
                            <div className="relative">
                                <img 
                                    src={`http://localhost:5000${item.images[0]}`} 
                                    alt="Newspaper" 
                                    className="w-full h-48 sm:h-56 object-cover cursor-pointer"
                                    onClick={() => openNewsModal(item)}
                                />
                                {item.images.length > 1 && (
                                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                                        📸 {item.images.length} photos
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                    <div className="opacity-0 hover:opacity-100 transition-opacity bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium">
                                        Click to read
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* News Info */}
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2 text-gray-800">{item.title}</h3>
                            
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                {item.source && (
                                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                                        📰 {item.source}
                                    </span>
                                )}
                                <span className="text-gray-500">
                                    📅 {new Date(item.date).toLocaleDateString()}
                                </span>
                            </div>
                            
                            <button 
                                onClick={() => openNewsModal(item)}
                                className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                            >
                                📖 Read Newspaper
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {newsList.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📰</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No News Available</h3>
                    <p className="text-gray-500">Check back later for the latest newspaper updates.</p>
                </div>
            )}

            {/* Enhanced Modal for Reading Newspaper */}
            {selectedNews && (
                <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col">
                    {/* Header with Controls */}
                    <div className="flex justify-between items-center p-2 sm:p-4 bg-black bg-opacity-70">
                        <div className="text-white flex-1">
                            <h3 className="font-semibold text-sm sm:text-base">{selectedNews.title}</h3>
                            <div className="text-xs sm:text-sm text-gray-300 flex flex-wrap gap-2 sm:gap-4">
                                {selectedNews.source && <span>📰 {selectedNews.source}</span>}
                                <span>📅 {new Date(selectedNews.date).toLocaleDateString()}</span>
                                {selectedNews.images && selectedNews.images.length > 1 && (
                                    <span>📄 Page {currentImageIndex + 1} of {selectedNews.images.length}</span>
                                )}
                            </div>
                        </div>

                        {/* Zoom Controls */}
                        <div className="flex items-center gap-1 sm:gap-2 mx-2 sm:mx-4">
                            <button
                                onClick={zoomOut}
                                disabled={zoomLevel <= 0.5}
                                className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white p-1 sm:p-2 rounded text-xs sm:text-sm"
                                title="Zoom Out (-)"
                            >
                                🔍➖
                            </button>
                            <span className="text-white text-xs sm:text-sm min-w-[3rem] text-center">
                                {Math.round(zoomLevel * 100)}%
                            </span>
                            <button
                                onClick={zoomIn}
                                disabled={zoomLevel >= 5}
                                className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white p-1 sm:p-2 rounded text-xs sm:text-sm"
                                title="Zoom In (+)"
                            >
                                🔍➕
                            </button>
                            <button
                                onClick={resetZoom}
                                className="bg-gray-700 hover:bg-gray-600 text-white p-1 sm:p-2 rounded text-xs sm:text-sm"
                                title="Reset Zoom (0)"
                            >
                                🔄
                            </button>
                        </div>

                        <button 
                            onClick={closeNewsModal}
                            className="text-white hover:text-gray-300 p-1 sm:p-2"
                            title="Close (ESC)"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Controls */}
                    {selectedNews.images && selectedNews.images.length > 1 && (
                        <div className="flex justify-between items-center px-4 py-2 bg-black bg-opacity-50">
                            <button
                                onClick={prevImage}
                                disabled={currentImageIndex === 0}
                                className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                            >
                                ⬅️ Previous
                            </button>
                            <div className="flex gap-1">
                                {selectedNews.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentImageIndex(index);
                                            resetZoom();
                                        }}
                                        className={`w-2 h-2 rounded-full ${
                                            index === currentImageIndex ? 'bg-orange-500' : 'bg-gray-500'
                                        }`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={nextImage}
                                disabled={currentImageIndex === selectedNews.images.length - 1}
                                className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                            >
                                Next ➡️
                            </button>
                        </div>
                    )}

                    {/* Image Viewer */}
                    <div className="flex-1 overflow-hidden relative bg-gray-900">
                        {selectedNews.images && selectedNews.images[currentImageIndex] && (
                            <div 
                                className="w-full h-full flex items-center justify-center cursor-move"
                                style={{ 
                                    cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                                }}
                            >
                                <img 
                                    src={`http://localhost:5000${selectedNews.images[currentImageIndex]}`}
                                    alt={`Newspaper page ${currentImageIndex + 1}`}
                                    className="max-w-none max-h-none object-contain select-none"
                                    style={{
                                        transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                                        transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                                    }}
                                    onMouseDown={handleMouseDown}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleMouseUp}
                                    draggable={false}
                                />
                            </div>
                        )}

                        {/* Quick Action Buttons */}
                        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                            <button
                                onClick={() => openImageInNewTab(selectedNews.images[currentImageIndex])}
                                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg"
                                title="Open in New Tab"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Footer with Instructions */}
                    <div className="p-2 sm:p-4 bg-black bg-opacity-70 text-center">
                        <div className="text-white text-xs sm:text-sm">
                            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                                <span>🔍 +/- to zoom</span>
                                <span>🖱️ Drag to pan</span>
                                {selectedNews.images && selectedNews.images.length > 1 && <span>⬅️➡️ Navigate pages</span>}
                                <span>ESC to close</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}