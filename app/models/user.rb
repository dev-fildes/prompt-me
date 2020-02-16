class User < ApplicationRecord
  has_one :profile
  after_create :create_profile

  has_many :posts
  mount_uploader :profile_photo, ProfilePhotoUploader

  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :validatable

end
