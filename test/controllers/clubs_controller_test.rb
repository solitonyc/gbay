require 'test_helper'

class ClubsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @club = clubs(:one)
  end

  test "should get index" do
    get clubs_url, as: :json
    assert_response :success
  end

  test "should create club" do
    assert_difference('Club.count') do
      post clubs_url, params: { club: { brand: @club.brand, club_color: @club.club_color, club_length: @club.club_length, condition: @club.condition, description: @club.description, dexterity: @club.dexterity, headline: @club.headline, loft: @club.loft, model: @club.model, price: @club.price, shaft_flex: @club.shaft_flex, shaft_name: @club.shaft_name, shaft_weight: @club.shaft_weight, user_id: @club.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show club" do
    get club_url(@club), as: :json
    assert_response :success
  end

  test "should update club" do
    patch club_url(@club), params: { club: { brand: @club.brand, club_color: @club.club_color, club_length: @club.club_length, condition: @club.condition, description: @club.description, dexterity: @club.dexterity, headline: @club.headline, loft: @club.loft, model: @club.model, price: @club.price, shaft_flex: @club.shaft_flex, shaft_name: @club.shaft_name, shaft_weight: @club.shaft_weight, user_id: @club.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy club" do
    assert_difference('Club.count', -1) do
      delete club_url(@club), as: :json
    end

    assert_response 204
  end
end
