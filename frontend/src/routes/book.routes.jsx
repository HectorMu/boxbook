import IsLoggedIn from '../components/Authentication/IsLoggedIn'
import AllResults from '../pages/Books/AllResults'
import Details from '../pages/Books/Details'

const Template = {
  dev: [
    {
      path: '/books/results/:title',
      element: <AllResults />
    },
    {
      path: '/books/details/:id',
      element: <Details />
    }
  ],

  //Protected for production
  production: [
    {
      path: '/books/results/:title',
      element: <IsLoggedIn view={AllResults} />
    },
    {
      path: '/books/details/:id',
      element: <IsLoggedIn view={Details} />
    }
  ]
}

export default Template
