class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.text :body, null: false
      t.belongs_to :user
      t.belongs_to :post

      t.timestamps null: false
    end
  end
end
