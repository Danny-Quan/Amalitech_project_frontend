import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../LandingPage/Navbar'
import Footer from '../LandingPage/Footer'
import { AllFilesContext } from '../../../store/FileServices/FilesContext'
import { useParams } from 'react-router-dom'

function Search() {
    const {key}= useParams()
    const FILES_CONTEXT= useContext(AllFilesContext)
    const {allFiles,isLoading,searchFile}= FILES_CONTEXT

    const [searchedFeeds, setSearchedFeeds]= useState([])

    useEffect(() => {
        let feeds;
        const searchFeed = async () => {
          feeds = await searchFile(key);
          setSearchedFeeds(feeds);
          return feeds;
        };
        searchFeed();
      }, [key]);

  return (
    <>
        <Navbar/>
     <div className='container p-8 mt-8'>
        <h3 className='font-semibold text-xl pb-3'>Files Found</h3>
        <h5>product(s)</h5>
        </div>   
        <Footer/>
    </>
  )
}

export default Search