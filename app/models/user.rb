class User < ApplicationRecord
    has_many :clubs
    has_secure_password

    validates :name, presence: true, uniqueness: true
    validates :email, presence: true, uniquness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password,
            length: { minimum: 6 },
            if: -> { new_record? || !password.nil? }
end
