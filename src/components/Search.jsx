import React, { useState } from 'react';

// const Search = ({ onSearch }) => {
//     const [query, setQuery] = useState('');

//     const handleInputChange = (e) => {
//         setQuery(e.target.value);
//     };

//     const handleSearch = () => {
//         if (onSearch) {
//             onSearch(query);
//         }
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={query}
//                 onChange={handleInputChange}
//                 placeholder="Search..."
//             />
//             <button onClick={handleSearch}>Search</button>
//         </div>
//     );
// };


const Search = () => {
    return (
        <div className="text-white flex justify-center items-center mt-10 text-3xl">
            Search 
        </div>
    );
};
export default Search;