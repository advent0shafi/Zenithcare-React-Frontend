import React from 'react'
import BlogCards from '../helpers/BlogCards'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const BlogListMainBody = () => {
  return (
    <div>
       <div className='justify-center items-center pr-24 pl-24'>
  <form className="bg-white mt-4 py-2 input-box-shadow rounded-md flex justify-between">
    <input
      className="bg-white"
      type="text"
      placeholder="Search therapist here"
      style={{ width: '100%' }}  // Adjust the width here
    />
    <div className="mr-4 mt-2">
      <FontAwesomeIcon icon={faMagnifyingGlass} beat />
    </div>
  </form>
</div>

        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
         <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
       
        <BlogCards/>
        <BlogCards/>
        <BlogCards/>
        <BlogCards/>
        <BlogCards/>
        <BlogCards/>
        <BlogCards/>
        <BlogCards/>
        <BlogCards/>


      </div>
    </div>
    </div>
  )
}

export default BlogListMainBody