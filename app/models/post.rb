class Post < ApplicationRecord
  belongs_to :user
  has_many :reviews

  validates :body, presence: true
end
