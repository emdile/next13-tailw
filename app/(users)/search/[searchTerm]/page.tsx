import React from 'react'

type SearchResultsProps = {
    params: {
        searchTerm: string
    }
}

const search = async (searchTerm: string) => {
    const glob: { [i: string]: string } = {
        'javascript': 'I love it',
        'php': 'i go my way'
    }

    const res = glob[searchTerm.toLowerCase()]

    throw new Error('Whoops something broke :(')

    return res
}

const SearchResults = async ({ params: { searchTerm } }: SearchResultsProps) => {
    const searchResult = await search(searchTerm)
    return (
        <h3>{searchResult}</h3>
    )
}

export default SearchResults