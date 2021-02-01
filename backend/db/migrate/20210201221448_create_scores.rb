class CreateScores < ActiveRecord::Migration[6.0]
  def change
    create_table :scores do |t|
      t.integer :wins
      t.integer :loses
      t.integer :draws
      t.integer :user_id

      t.timestamps
    end
  end
end
