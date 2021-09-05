import {BOOKS_LIST, GENRE_LIST} from "./endpoints";

export const getBooksListApi = (searchParams) => {
    const stringParams = Object.keys(searchParams)
        .map(name => {
            if(Array.isArray(searchParams[name])) {
                return searchParams[name].map(value => `${name}=${value}`).join('&');
            }
            return `${name}=${searchParams[name]}`
        })
        .join('&');
    const queryParams = stringParams ? `?${stringParams}` : '';
    return fetch(`${BOOKS_LIST}${queryParams}`)
         .then(data => data.json())
}

export const deleteBookApi = (id) => {
         return fetch(`${BOOKS_LIST}/${id}`, {
             method: 'DELETE'
         });
     }

export const createBookApi = (book) => {
      return fetch(BOOKS_LIST, {
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
          },
          method: 'POST',
          body: JSON.stringify(book)
      });
  }
export const updateBookApi = (id, data) => {
    return fetch(`${BOOKS_LIST}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
}

export const getGenresList = () => {
    return fetch(GENRE_LIST).then(res => res.json());
}