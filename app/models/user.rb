class User < ApplicationRecord
  has_one :profile
  after_create :create_profile

  has_many :posts

  attr_writer :login
  mount_uploader :profile_photo, ProfilePhotoUploader

  def login
    @login || self.username || self.email
  end

  devise :database_authenticatable, :registerable, :recoverable, :rememberable,
  :validatable, authentication_keys: [:login]

  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true
  validates :username, presence: :true, uniqueness: { case_sensitive: false }
  validates :status, length: { maximum: 30 }

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions.to_h).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    elsif conditions.has_key?(:username) || conditions.has_key?(:email)
      where(conditions.to_h).first
    end
  end
end
