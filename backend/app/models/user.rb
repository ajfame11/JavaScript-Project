class User < ApplicationRecord
    # User's relationship with games and scores
    has_many :games, dependent: :destroy 
    has_many :scores, dependent: :destroy
end
