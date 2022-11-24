'use client'

import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'

const Search = () => {
    const [search, setSearch] = useState('')
    const router = useRouter()

    const handleSearch = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearch('')
        router.push(`/search/${search}`)
    }

    return (
        <form onSubmit={handleSearch}>
            <input type="text"
                value={search}
                placeholder='Enter search term'
                onChange={e => setSearch(e.target.value)}
            />

            <button type='submit' className='bg-blue-500 text-white font-bold py-2 px-4 rounded-lg'
            >
                Search
            </button>
        </form>
    )
}

export default Search