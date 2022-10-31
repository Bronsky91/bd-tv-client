import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './index.css'
import { Home } from './Home'
import { Upload } from './Upload'
import { Watch } from './Watch'

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/watch/:videoId">
            <Watch />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
)
