class ScoreSerializer < ActiveModel::Serializer
  attributes :id, :wins, :loses, :draws, :user_id
end
