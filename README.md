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
  5. `rails s`
  6. In a separate tab, `yarn start`
  7. In a browser, visit, `http://localhost:3000`
