[![Codeship Status for dev-fildes/prompt-me](https://app.codeship.com/projects/024fcf60-319b-0138-a622-5a445d5df4a4/status?branch=master)](https://app.codeship.com/projects/385473)

# Prompt Me!

Prompt Me is a blog-like site where writers can post stories they've written or generate a random prompt to help get them started. Users can leave feedback on submissions to help one another improve. Built with React and Rails with Jest/Enzyme and Rspec for testing.

## Authors
  * Sarah Fildes

## Dependencies
  * Ruby 2.6.5
  * Ruby-On-Rails 5.2.3
  * React 16.8.0
  * Devise
  * Carrierwave
  * Fog-AWS

## Setup Instructions
  1. `bundle install`
  2. `yarn install`
  3. `bundle exec rake db:create`
  4. `bundle exec rake db:migrate`
  5. `bundle exec rake db:seed`
  6. `rails s`
  7. In a separate tab, `yarn start`
  8. In a browser, visit, `http://localhost:3000`
