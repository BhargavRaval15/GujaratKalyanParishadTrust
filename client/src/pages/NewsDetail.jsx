import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewsById } from '../api/news';

export default function NewsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

    useEffect(() => {
        fetchNews();
    }, [id]);

    const fetchNews = async () => {
        try {
            const data = await getNewsById(id);
            setNews(data);
        } catch (err) {
            console.error('Error fetching news:', err);
        } finally {
            setLoading(false);
        }
    };

    const openLightbox = (index) => {
        setLightboxImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'unset'; // Restore scroll
    };

    const nextImage = () => {
        if (news.images && lightboxImageIndex < news.images.length - 1) {
            setLightboxImageIndex(lightboxImageIndex + 1);
        }
    };

    const prevImage = () => {
        if (lightboxImageIndex > 0) {
            setLightboxImageIndex(lightboxImageIndex - 1);
        }
    };

    const openImageInNewTab = (imageUrl) => {
        window.open(`http://localhost:5000${imageUrl}`, '_blank');
    };

    // Handle keyboard navigation and touch events
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (lightboxOpen) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
            }
        };

        let touchStartX = 0;
        let touchEndX = 0;

        const handleTouchStart = (e) => {
            if (lightboxOpen) {
                touchStartX = e.changedTouches[0].screenX;
            }
        };

        const handleTouchEnd = (e) => {
            if (lightboxOpen) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }
        };

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const swipeDistance = touchStartX - touchEndX;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    // Swiped left - next image
                    nextImage();
                } else {
                    // Swiped right - previous image
                    prevImage();
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);
        
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [lightboxOpen, lightboxImageIndex, news]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (!news) {
        return (
            <div className="max-w-4xl mx-auto mt-10 p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-600">News not found</h2>
                <button 
                    onClick={() => navigate('/news')}
                    className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
                >
                    Back to News
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto pt-6 pb-12 px-4 sm:px-6">
                {/* Navigation */}
                <div className="mb-6">
                    <button 
                        onClick={() => navigate('/news')}
                        className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-sm border border-gray-200 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to News
                    </button>
                </div>

                {/* Article */}
                <article className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 sm:p-8">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">{news.title}</h1>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-orange-100">
                            {news.source && (
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v10a2 2 0 002 2h5z" />
                                    </svg>
                                    <span>{news.source}</span>
                                </div>
                            )}
                            {news.category && (
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span>{news.category}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{new Date(news.date).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                        {/* Images Section */}
                        {news.images && news.images.length > 0 && (
                            <div className="mb-8">
                                {/* Main Image */}
                                <div className="mb-6">
                                    <div className="relative group cursor-pointer" onClick={() => openLightbox(selectedImageIndex)}>
                                        <img 
                                            src={`http://localhost:5000${news.images[selectedImageIndex]}`}
                                            alt={`News ${selectedImageIndex + 1}`}
                                            className="w-full h-64 sm:h-96 object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-xl flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 px-4 py-2 rounded-full flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                </svg>
                                                <span className="font-medium text-gray-800">Click to zoom & read</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-3">
                                        {news.images.length > 1 && (
                                            <p className="text-sm text-gray-500">
                                                Image {selectedImageIndex + 1} of {news.images.length}
                                            </p>
                                        )}
                                        <button
                                            onClick={() => openImageInNewTab(news.images[selectedImageIndex])}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            Open in New Tab
                                        </button>
                                    </div>
                                </div>

                                {/* Image Thumbnails */}
                                {news.images.length > 1 && (
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            All Newspaper Photos
                                        </h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                                            {news.images.map((image, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={`http://localhost:5000${image}`}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        className={`w-full h-24 sm:h-32 object-cover rounded-lg cursor-pointer border-2 transition-all duration-300 ${
                                                            selectedImageIndex === index 
                                                                ? 'border-orange-500 shadow-lg scale-105' 
                                                                : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                                                        }`}
                                                        onClick={() => setSelectedImageIndex(index)}
                                                    />
                                                    {selectedImageIndex === index && (
                                                        <div className="absolute inset-0 bg-orange-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                                                            <div className="bg-orange-500 text-white rounded-full p-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {/* Zoom and New Tab buttons on hover/touch */}
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100">
                                                        <div className="flex gap-1 sm:gap-2">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openLightbox(index);
                                                                }}
                                                                className="bg-white text-gray-800 p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
                                                                title="Zoom to read"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openImageInNewTab(image);
                                                                }}
                                                                className="bg-white text-gray-800 p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
                                                                title="Open in new tab"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Mobile: Always visible small buttons */}
                                                    <div className="md:hidden absolute top-1 right-1 flex gap-1">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openLightbox(index);
                                                            }}
                                                            className="bg-black bg-opacity-70 text-white p-1 rounded-full text-xs"
                                                        >
                                                            🔍
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* News Content */}
                        <div className="prose prose-lg max-w-none">
                            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-orange-500">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    Full News Story
                                </h2>
                                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
                                    {news.description}
                                </div>
                            </div>
                        </div>

                        {/* Share Section */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="text-sm text-gray-500">
                                    Published on {new Date(news.date).toLocaleDateString('en-US', { 
                                        weekday: 'long',
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </div>
                                <button 
                                    onClick={() => navigate('/news')}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v10a2 2 0 002 2h5z" />
                                    </svg>
                                    Read More News
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && news.images && (
                <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col">
                    {/* Header with controls */}
                    <div className="flex justify-between items-center p-2 sm:p-4 bg-black bg-opacity-50">
                        {/* Image counter */}
                        <div className="text-white text-sm sm:text-base">
                            {lightboxImageIndex + 1} / {news.images.length}
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => openImageInNewTab(news.images[lightboxImageIndex])}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm flex items-center gap-1 sm:gap-2 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                <span className="hidden sm:inline">Open in New Tab</span>
                                <span className="sm:hidden">New Tab</span>
                            </button>
                            
                            <button
                                onClick={closeLightbox}
                                className="text-white hover:text-gray-300 p-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Main image container */}
                    <div className="flex-1 relative overflow-hidden">
                        {/* Image navigation */}
                        {news.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    disabled={lightboxImageIndex === 0}
                                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 bg-black bg-opacity-50 rounded-full p-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    disabled={lightboxImageIndex === news.images.length - 1}
                                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 bg-black bg-opacity-50 rounded-full p-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Scrollable image container */}
                        <div className="w-full h-full overflow-auto p-2 sm:p-4 flex items-center justify-center">
                            <img
                                src={`http://localhost:5000${news.images[lightboxImageIndex]}`}
                                alt={`News image ${lightboxImageIndex + 1}`}
                                className="max-w-full max-h-full object-contain cursor-pointer transition-transform duration-300"
                                style={{ 
                                    minWidth: 'auto',
                                    minHeight: 'auto'
                                }}
                                onClick={(e) => {
                                    // Toggle zoom on click
                                    const currentScale = e.target.style.transform;
                                    if (currentScale.includes('scale(2)') || currentScale.includes('scale(3)')) {
                                        e.target.style.transform = 'scale(1)';
                                        e.target.style.cursor = 'zoom-in';
                                    } else if (currentScale.includes('scale(1)') || !currentScale) {
                                        // On mobile, use 2x zoom, on desktop use 3x
                                        const zoomLevel = window.innerWidth < 768 ? 2 : 3;
                                        e.target.style.transform = `scale(${zoomLevel})`;
                                        e.target.style.cursor = 'zoom-out';
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Footer with instructions */}
                    <div className="p-2 sm:p-4 bg-black bg-opacity-50">
                        <div className="text-white text-xs sm:text-sm text-center">
                            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                                <span>📱 Tap image to zoom</span>
                                <span>🔄 Scroll to pan</span>
                                {news.images.length > 1 && <span>⬅️➡️ Swipe/arrows to navigate</span>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}