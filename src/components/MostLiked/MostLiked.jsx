import { React, useMemo, useState, useEffect } from 'react';
import { Link, MemoryRouter, Route, Routes, useLocation } from 'react-router';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import axios from 'axios';
import MixesCards from '../MixesCards/MixesCards.jsx'
import "./MostLiked.css";


export default function MostLiked({ mezclas, setInitialMezclas, loading, error }) {

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const page = parseInt(query.get('page') || '1', 10)

    const itemsPerPage = 18
    const totalPages = Math.ceil(mezclas.length / itemsPerPage)

    // Slice the mixes based on current page
    const displayedMixes = useMemo(() => {
        const sortedMixes = [...mezclas].sort((a, b) => (b.Likes || 0) - (a.Likes || 0));
        const startIndex = (page - 1) * itemsPerPage;
        return sortedMixes.slice(startIndex, startIndex + itemsPerPage);
    }, [mezclas, page])

    return (
        <>
            <div className='MostLiked'>
                <h6 style={{ transform: 'translateX(7.5vh)', width: '300px'  }}>Most Liked Mixes</h6>
                <MixesCards mezclas={displayedMixes} setInitialMezclas={setInitialMezclas} loading={loading} error={error} />
                <div className='pagination'>
                    {mezclas.length > itemsPerPage && (
                        <div className="pagination-container">
                            <Pagination
                                page={page}
                                count={totalPages}
                                siblingCount={1}
                                boundaryCount={1}
                                renderItem={(item) => (
                                    <PaginationItem
                                        component={Link}
                                        to={`?page=${item.page}`}
                                        {...item}
                                    />
                                )}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

