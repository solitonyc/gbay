class ChangePriceToBeStringInClubs < ActiveRecord::Migration[5.2]
  def change
    change_column :clubs, :price, :string
  end
end
