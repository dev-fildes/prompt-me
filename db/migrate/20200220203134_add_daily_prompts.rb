class AddDailyPrompts < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :daily, :text
  end
end
