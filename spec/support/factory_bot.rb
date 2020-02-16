require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    username { 'vroom' }
    password_confirmation { 'password' }
  end

end
