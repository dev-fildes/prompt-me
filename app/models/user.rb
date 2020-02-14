class User < ApplicationRecord
  has_many :posts

  mount_uploader :profile_photo, ProfilePhotoUploader

  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :validatable
end
