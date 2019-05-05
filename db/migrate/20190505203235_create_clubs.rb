class CreateClubs < ActiveRecord::Migration[5.2]
  def change
    create_table :clubs do |t|
      t.string :headline
      t.string :brand
      t.string :model
      t.string :dexterity
      t.string :shaft_name
      t.string :shaft_flex
      t.string :shaft_weight
      t.string :club_color
      t.string :loft
      t.string :club_length
      t.text :description
      t.string :condition
      t.decimal :price
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
