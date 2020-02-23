class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.text :review, null: false
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
