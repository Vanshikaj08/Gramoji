import React from 'react'
// import type { SearchResultProps } from '../../../_root/pages/Explore'
import type { Models } from 'appwrite';
import { Loader } from 'lucide-react';
import GridPostList from './GridPostList';
import { searchPosts } from '../../../lib/appwrite/api';


type SearchResultProps ={
  isSearchFetching:boolean;
  searchedPosts: Models.Document[];
}

const SearchResults = ({isSearchFetching,searchedPosts}:SearchResultProps) => {
  if(isSearchFetching) return < Loader/>

  if(searchedPosts && searchedPosts.documnets.length > 0){
    return (
      <GridPostList posts={searchPosts.documents} />
    )
  }

  return (
    <p className='text-light-4 mt-10 text-center w-full'>No Results found! </p>
  )
}

export default SearchResults
